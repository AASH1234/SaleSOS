from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
import enum

from .database import Base

class Role(enum.Enum):
    admin = "admin"
    manager = "manager"
    executive = "executive"

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    users = relationship("User", back_populates="organization")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(Role))
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    organization = relationship("Organization", back_populates="users")
    groups = relationship("GroupMember", back_populates="user")

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    members = relationship("GroupMember", back_populates="group")

class GroupMember(Base):
    __tablename__ = "group_members"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    group = relationship("Group", back_populates="members")
    user = relationship("User", back_populates="groups")
