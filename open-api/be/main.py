from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class GreetingRequest(BaseModel):
    name: str

class GreetingResponse(BaseModel):
    greetings: str

@app.post("/greeting")
def greeting(item:GreetingRequest) -> GreetingResponse:
    return GreetingResponse(greetings= f"Hello {item.name}")