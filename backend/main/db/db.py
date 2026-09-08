import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

client = MongoClient(DATABASE_URL)

db = client["Url_Shortner"]

url_collection = db["urls"]
url_collection.create_index(
    "short_code",
    unique=True
)