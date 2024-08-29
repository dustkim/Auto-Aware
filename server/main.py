import os
import uvicorn
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from middle import signup_middle, login_middle, tokenCheck

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 앱의 URL
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)


class LoginData(BaseModel):
    userid: str
    password: str

class SignupData(BaseModel):
    userid: str
    password: str
    number: str

class TokenData(BaseModel):
    token: str

@app.post("/login")
async def login(request: LoginData):
    data = { "id": request.userid, "pw": request.password}
    result = login_middle(data)
    return result

@app.post("/signup")
async def signup(request: SignupData):
    data = { "id" : request.userid, "pw" : request.password, "num" : request.number}
    result = signup_middle(data)
    return result 

@app.post("/validateToken")
async def validate_token(request: TokenData):
    token = request.token
    result = tokenCheck(token)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)