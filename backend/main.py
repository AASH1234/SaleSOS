from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from jose import JWTError, jwt
from datetime import timedelta, datetime

import auth, crud, models, schemas, email_utils
from database import SessionLocal, engine
import random

# Add email utility import (you'll need to create this or use a service)
# from email_utils import send_otp_email  # Uncomment when you implement email service

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def generate_otp():
    return str(random.randint(100000, 999999))  # 6-digit OTP

# Store pending registrations in memory (use Redis or database in production)
pending_registrations = {}

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    # Create access token and refresh token
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token, refresh_expires_at = auth.create_refresh_token(data={"sub": user.email})
    
    # Save refresh token to the database
    crud.save_access_token(db, user_id=user.id, token=access_token, expires_at=refresh_expires_at)
    return {"access_token": access_token, "token_type": "bearer", "refresh_token": access_token}

@app.post("/token/refresh", response_model=schemas.RefreshTokenResponse)
async def refresh_access_token(request: schemas.RefreshTokenRequest, db: Session = Depends(get_db)):
    token = request.refresh_token
    db_refresh_token = crud.get_refresh_token(db, token=token)

    if not db_refresh_token or db_refresh_token.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = crud.get_user(db, user_id=db_refresh_token.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Expire the old refresh token
    crud.expire_refresh_token(db, token=token)

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/organizations/", response_model=schemas.Organization)
def create_organization(organization: schemas.OrganizationCreate, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_organization = crud.get_organization_by_name(db, name=organization.name)
    if db_organization:
        raise HTTPException(status_code=400, detail="Organization already registered")
    db_organization = crud.create_organization(db=db, organization=organization)
    crud.create_user(db=db, user=user, organization_id=db_organization.id, role=models.Role.admin)
    return db_organization

@app.get("/organizations/", response_model=List[schemas.Organization])
def get_all_organizations(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_organizations(db=db)


@app.post("/groups/", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in [models.Role.admin, models.Role.manager]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.create_group(db=db, group=group, organization_id=current_user.organization_id, manager_id=current_user.id)

@app.post("/groups/{group_id}/users/", response_model=schemas.User)
def add_user_to_group(group_id: int, user_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in [models.Role.admin, models.Role.manager]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user_to_add = crud.get_user(db, user_id=user_id)
    group = crud.get_group(db, group_id=group_id)

    if not user_to_add or not group:
        raise HTTPException(status_code=404, detail="User or group not found")

    if user_to_add.organization_id != current_user.organization_id or group.organization_id != current_user.organization_id:
        raise HTTPException(status_code=403, detail="User and group must belong to the same organization as the current user")

    db_group_member = models.GroupMember(group_id=group_id, user_id=user_id)
    db.add(db_group_member)
    db.commit()
    db.refresh(db_group_member)
    return user_to_add

@app.get("/groups/{group_id}/users/", response_model=List[schemas.User])
def get_users_in_group(group_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    group = crud.get_group(db, group_id=group_id)

    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    if group.organization_id != current_user.organization_id:
        raise HTTPException(status_code=403, detail="You do not have permission to view this group")

    db_group_members = db.query(models.GroupMember).filter(models.GroupMember.group_id == group_id).all()
    return [member.user for member in db_group_members]

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in [models.Role.admin, models.Role.manager]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return crud.create_user(db=db, user=user, organization_id=current_user.organization_id, role=user.role)

@app.post("/register/")
async def register_user(user: schemas.UserRegister, db: Session = Depends(get_db)):
    try:
        print(f"Received registration request: {user.dict()}")
        
        # Check if email already exists
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Generate and send OTP
        otp = generate_otp()
        crud.save_otp(user.email, otp, db)
        email_utils.send_otp_email(user.email, otp)
        
        # Store pending registration data
        pending_registrations[user.email] = user.dict()
        
        print(f"OTP for {user.email}: {otp}")  # Remove in production!
        return {"message": "OTP sent to your email. Please verify to complete registration", "email": user.email}
    except HTTPException:
        raise
    except ValueError as e:
        print(f"Registration ValueError: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Registration Exception: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/register/verify-otp/", response_model=schemas.User)
async def verify_otp_and_register(email: str, otp: str, db: Session = Depends(get_db)):
    try:
        # Verify OTP
        stored_otp = crud.get_otp(email, db)
        if not stored_otp or stored_otp != otp:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
        # Check if pending registration exists
        if email not in pending_registrations:
            raise HTTPException(status_code=400, detail="No pending registration found for this email")
        
        # Get pending registration data
        user_data = pending_registrations[email]
        user = schemas.UserRegister(**user_data)
        
        # Create the user
        new_user = crud.register_user(db=db, user=user)
        
        # Clean up
        del pending_registrations[email]
        crud.delete_otp(email, db)  # Assuming you have this function in crud
        
        return new_user
    except HTTPException:
        raise
    except Exception as e:
        print(f"Verification Exception: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/send-otp/")
async def send_otp(email: str, db: Session = Depends(get_db)):
    otp = generate_otp()
    # Save OTP to the database or cache with expiration
    crud.save_otp(email, otp, db)
    email_utils.send_otp_email(email, otp)  # Uncomment when email service is ready
    # For development, you can log the OTP or return it
    print(f"OTP for {email}: {otp}")  # Remove in production!
    return {"message": "OTP sent successfully"}

@app.post("/verify-otp/")
async def verify_otp(email: str, otp: str, db: Session = Depends(get_db)):
    stored_otp = crud.get_otp(email, db)
    if stored_otp == otp:
        return {"message": "OTP verified successfully"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")

