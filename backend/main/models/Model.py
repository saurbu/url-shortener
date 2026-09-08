from datetime import datetime


def create_url_document(original_url, short_code):
    return {
        "original_url": original_url,
        "short_code": short_code,
        "clicks": 0,
        "created_at": datetime.utcnow()
    }