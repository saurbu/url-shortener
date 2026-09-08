from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from main.routes.urlRoutes import router as url_router
from main.routes.qrRoutes import router as qr_router
from main.controller.Controller import get_url

app = FastAPI(
    title="URL Shortener & QR Generator API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(url_router)
app.include_router(qr_router)


@app.get("/")
def root():
    return {
        "message": "URL Shortener & QR Generator API"
    }


@app.get("/{short_code}")
def short_url_redirect(short_code: str):
    url = get_url(short_code)

    if not url:
        raise HTTPException(
            status_code=404,
            detail="Short URL not found"
        )

    return RedirectResponse(
        url=url["original_url"],
        status_code=307
    )