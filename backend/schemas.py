from pydantic import BaseModel
from typing import List, Optional
from models import Role

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class RefreshTokenResponse(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    email: str
    role: Role

class UserCreate(UserBase):
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    organization_name: str

class User(UserBase):
    id: int
    organization_id: int

    class Config:
        orm_mode = True

class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    id: int
    organization_id: int

    class Config:
        orm_mode = True

class OrganizationBase(BaseModel):
    name: str

class OrganizationCreate(OrganizationBase):
    pass

class Organization(OrganizationBase):
    id: int
    users: List[User] = []

    class Config:
        orm_mode = True
