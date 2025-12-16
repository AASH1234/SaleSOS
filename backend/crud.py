from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate, organization_id: int, role: models.Role):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(name=user.name, email=user.email, hashed_password=hashed_password, organization_id=organization_id, role=role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_organization(db: Session, organization: schemas.OrganizationCreate):
    db_organization = models.Organization(name=organization.name)
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization


def get_organization_by_name(db: Session, name: str):
    return db.query(models.Organization).filter(models.Organization.name == name).first()


def get_organizations(db: Session):
    return db.query(models.Organization).all()


def create_group(db: Session, group: schemas.GroupCreate, organization_id: int, manager_id: int):
    db_group = models.Group(name=group.name, organization_id=organization_id)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)

    # Add the manager to the group
    db_group_member = models.GroupMember(group_id=db_group.id, user_id=manager_id)
    db.add(db_group_member)
    db.commit()
    db.refresh(db_group_member)

    return db_group

def register_user(db: Session, user: schemas.UserRegister):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise ValueError("Email already registered")

    organization = get_organization_by_name(db, name=user.organization)
    if not organization:
        organization = create_organization(db, organization=schemas.OrganizationCreate(name=user.organization))
    
    organization_id = organization.id

    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(name=user.name, email=user.email, hashed_password=hashed_password, organization_id=organization_id, role=models.Role.admin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def save_access_token(db: Session, user_id: int, token: str, expires_at: datetime):
    db_refresh_token = models.RefreshToken(
        user_id=user_id,
        token=token,
        expires_at=expires_at
    )
    db.add(db_refresh_token)
    db.commit()
    db.refresh(db_refresh_token)
    return db_refresh_token


def get_refresh_token(db: Session, token: str):
    return db.query(models.RefreshToken).filter(models.RefreshToken.token == token).first()


def expire_refresh_token(db: Session, token: str):
    db_token = get_refresh_token(db, token)
    if db_token:
        db_token.expires_at = datetime.utcnow()
        db.commit()
        db.refresh(db_token)
    return db_token

def save_otp(email: str, otp: str, db: Session, expiration_minutes: int = 10):
    """Save OTP to database with expiration time"""
    from datetime import datetime, timedelta
    
    # Delete any existing OTPs for this email
    db.query(models.OTP).filter(models.OTP.email == email).delete()
    
    expires_at = datetime.utcnow() + timedelta(minutes=expiration_minutes)
    db_otp = models.OTP(
        email=email,
        otp_code=otp,
        expires_at=expires_at
    )
    db.add(db_otp)
    db.commit()
    db.refresh(db_otp)
    return db_otp

def get_otp(email: str, db: Session):
    """Retrieve valid OTP for email"""
    from datetime import datetime
    
    otp_record = db.query(models.OTP).filter(
        models.OTP.email == email,
        models.OTP.is_used == False,
        models.OTP.expires_at > datetime.utcnow()
    ).order_by(models.OTP.created_at.desc()).first()
    
    if otp_record:
        # Mark as used
        otp_record.is_used = True
        db.commit()
        return otp_record.otp_code
    return None

def delete_otp(email: str, db: Session):
    """Delete OTP record for the given email"""
    otp_record = db.query(models.OTP).filter(models.OTP.email == email).first()
    if otp_record:
        db.delete(otp_record)
        db.commit()
    return True

def papaji():
    """A simple function that returns 'Papaji! was here'"""
    return "Papaji! was here"