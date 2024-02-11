from fastapi import APIRouter
from schemas.msg import Msg


router = APIRouter()

@router.get("/home", response_model=Msg)
def home():
    return {
        "msg":"Welcome my project"
    }