from fastapi import APIRouter

router = APIRouter()


@router.get("/test")
def test():
    return {
        "message": "URL route is working"
    }