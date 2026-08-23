from fastapi import APIRouter

url_router = APIRouter()


@url_router.get("/test")
def test():
    return {
        "message": "URL route is working"
    }