import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter

from main.schemas.Schema import URLCreate
from main.controller.Controller import create_short_url

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

router = APIRouter(prefix="/api/url", tags=["URL"])


@router.post("/shorten")
def shorten_url(data: URLCreate):
    base_url = os.getenv("BASE_URL")

    return create_short_url(
        str(data.url),
        base_url
    )