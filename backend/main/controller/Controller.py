import base64
import secrets
import string
from io import BytesIO

import qrcode
from fastapi import HTTPException

from main.db.db import url_collection


def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits

    return "".join(
        secrets.choice(characters)
        for _ in range(length)
    )


def generate_qr_base64(url):
    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=4
    )

    qr.add_data(url)
    qr.make(fit=True)

    image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    buffer = BytesIO()
    image.save(buffer, format="PNG")

    return base64.b64encode(
        buffer.getvalue()
    ).decode("utf-8")


def create_short_url(original_url, base_url):
    while True:
        short_code = generate_short_code()

        existing = url_collection.find_one({
            "short_code": short_code
        })

        if not existing:
            break

    short_url = f"{base_url}/{short_code}"

    qr_code = generate_qr_base64(short_url)

    document = {
        "original_url": original_url,
        "short_code": short_code,
        "clicks": 0,
        "qr_code": qr_code
    }

    url_collection.insert_one(document)

    return {
        "original_url": original_url,
        "short_code": short_code,
        "short_url": short_url,
        "qr_code": qr_code,
        "clicks": 0
    }


def get_url(short_code):
    url = url_collection.find_one({
        "short_code": short_code
    })

    if not url:
        raise HTTPException(
            status_code=404,
            detail="Short URL not found"
        )

    url_collection.update_one(
        {"short_code": short_code},
        {"$inc": {"clicks": 1}}
    )

    return url