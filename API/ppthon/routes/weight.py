from fastapi import APIRouter
from config.database import conn
from models.weight import weights
from schemas.weight import Weight
weight = APIRouter()

@weight.get("/weight", tags=["weight"])
def get_weight():
    return conn.execute(weights.select()).fetchall()

@weight.post("/weight", tags=["weight"])
def create_weight(weight: Weight):
    conn.execute(weights.insert().values({
        "weight": weight.weight,
    }))
    return conn.execute(weights.select()).fetchall()