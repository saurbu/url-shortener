from io import BytesIO

import qrcode
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from main.schemas.Schema import URLCreate

router = APIRouter(prefix="/api/qr", tags=["QR"])


@router.post("/generate")
def generate_qr(data: URLCreate):
    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=4
    )

    qr.add_data(str(data.url))
    qr.make(fit=True)

    image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    buffer = BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="image/png"
    )