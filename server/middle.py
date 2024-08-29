import jwt
import datetime
from pymongo import MongoClient
from password_utils import hash_password, verify_password
from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

password_secret = os.environ["SECRET_KEY"]

# Mongodb 연결
mongodburl = f"mongodb+srv://{os.environ['MONGODB_KEY']}@cluster0.siectcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongodburl)
database = client["project3"]
collection = database["users"]

# 로그인을 위한 함수
def login_middle(data):
    try:
        user = collection.find_one({"userid": data["id"]})
        if user is None or not verify_password(data["pw"], user["userpw"]):
            return "false"
        # 로그인 성공 시 JWT 토큰 생성
        payload = {
            "userid": user["userid"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=0.01)  # 토큰 만료 시간 설정
        }
        token = jwt.encode(payload, password_secret, algorithm="HS256")
        return token
    except Exception as e:
        return str(e)

# 회원가입을 위한 함수
def signup_middle(data):
    try:
        search = collection.find_one({"userid" : data["id"]})
        if search == None:
            number = data["num"].replace("-", "") # 전화번호를 '-'없이 데이터 베이스에 저장함
            hashed_password = hash_password(data["pw"])
            collection.insert_one({"userid": data["id"], "userpw": hashed_password, "usernumber": number})
            return "true"
        return "false"
    except Exception as e:
        return str(e)
    
# 토큰 확인을 위한 함수
def tokenCheck(token):
    try:
        # JWT 토큰 검증
        payload = jwt.decode(token, password_secret, algorithms=["HS256"])
        return {"status": "valid", "userid": payload["userid"]}  # 유효한 경우 응답
    except jwt.ExpiredSignatureError:
        raise None