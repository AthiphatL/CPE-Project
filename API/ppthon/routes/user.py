from fastapi import APIRouter
from config.database import conn
from models.user import users
from schemas.user import User
user = APIRouter()

@user.get("/users", tags=["users"])
def get_users():
    return conn.execute(users.select()).fetchall()

@user.get("/users/{id}", response_model=User, tags=["users"])
def get_user(id: int):
    return conn.execute(users.select().where(users.c.id == id)).first()

@user.post("/users", tags=["users"])
def create_user(user: User):
    conn.execute(users.insert().values({
        "firstname": user.firstname,
        "lastname": user.lastname,
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "phone": user.phone
    }))
    return conn.execute(users.select()).fetchall()

@user.put("/users/{id}", tags=["users"])
def update_user(id:int, user: User):
    conn.execute(users.update().values({
        "firstname": user.firstname,
        "lastname": user.lastname,
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "phone": user.phone
    }).where(users.c.id == id))
    return conn.execute(users.select().where(users.c.id == id)).first()

@user.delete("/users/{id}", tags=["users"])
def delete_user(id: int):
    conn.execute(users.delete().where(users.c.id == id))
    return conn.execute(users.select()).fetchall()