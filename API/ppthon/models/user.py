from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.database import meta

users = Table(
    'users', meta,
    Column('id',Integer, primary_key=True),
    Column('firstname',String(50)),
    Column('lastname',String(50)),
    Column('username',String(100)),
    Column('password',String(100)),
    Column('email',String(100)),
    Column('phone',Integer)
)