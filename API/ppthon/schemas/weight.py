from datetime import datetime
from pydantic import BaseModel

class Weight(BaseModel):
    weight: float