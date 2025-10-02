from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate, organization_id: int, role: models.Role):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, organization_id=organization_id, role=role)
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

    organization = get_organization_by_name(db, name=user.organization_name)
    if not organization:
        organization = create_organization(db, organization=schemas.OrganizationCreate(name=user.organization_name))
    
    organization_id = organization.id

    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, organization_id=organization_id, role=models.Role.executive)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
