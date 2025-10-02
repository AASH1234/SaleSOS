from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

from . import auth, crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

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

@app.post("/register/", response_model=schemas.User)
def register_user(user: schemas.UserRegister, db: Session = Depends(get_db)):
    try:
        return crud.register_user(db=db, user=user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
