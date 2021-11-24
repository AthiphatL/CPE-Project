from fastapi import APIRouter
from config.database import conn
from models.history import temp
from schemas.history import Temp
history = APIRouter()

@history.get("/history", tags=["history"])
def get_history():
    like = "time LIKE %s OR " * 5
    where = like[:-3]
    return conn.execute("SELECT * FROM temp WHERE " + where + " GROUP BY DATE_FORMAT(time, %s) ORDER BY time DESC", ("%06:%:%", "%09:%:%", "%12:%:%", "%15:%:%", "%18:%:%", "%Y%m%d %H")).fetchall()