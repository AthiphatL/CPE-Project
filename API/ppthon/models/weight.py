from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import DateTime, Float, Integer
from config.database import meta

weights = Table(
    'weight', meta,
    Column('id',Integer, primary_key=True),
    Column('weight',Float),
    Column('time',DateTime),
)