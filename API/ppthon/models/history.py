from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import DateTime, Float, Integer
from config.database import meta

temp = Table(
    'temp', meta,
    Column('id',Integer, primary_key=True),
    Column('time',DateTime),
    Column('temp',Float),
    Column('humi',Float),
)