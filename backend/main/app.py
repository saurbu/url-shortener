from fastapi import FastAPI

from main.routes.urlRoutes import url_router

app = FastAPI()

app.include_router(url_router)


@app.get("/")
def home():
    return {
        "message": "URL Shortener is running "
    }