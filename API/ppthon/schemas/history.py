from pydantic import BaseModel

class Temp(BaseModel):
    temp: float
    humi: float