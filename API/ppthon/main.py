from fastapi import FastAPI
from routes import user, history, weight
app = FastAPI()

app.include_router(user.user)
app.include_router(history.history)
app.include_router(weight.weight)