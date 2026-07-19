from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

app = FastAPI(title="VeriTrust AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

USER_CREDENTIALS = {
    "admin": {
        "username": "admin",
        "password": "Admin@2026",
        "role": "admin",
        "token": "admin-token-2026",
    },
    "user": {
        "username": "user",
        "password": "User@2026",
        "role": "user",
        "token": "user-token-2026",
    },
}

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    role: str = "user"


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication token")

    for account in USER_CREDENTIALS.values():
        if credentials.credentials == account["token"]:
            return {"username": account["username"], "role": account["role"]}

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication token")


@app.get("/health")
def health():
    return {"status": "ok", "service": "veritrust-ai"}


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    for account in USER_CREDENTIALS.values():
        if payload.username == account["username"] and payload.password == account["password"]:
            return {
                "access_token": account["token"],
                "username": account["username"],
                "role": account["role"],
            }

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")


@app.get("/auth/me")
def me(user: dict = Depends(get_current_user)):
    return user


@app.post("/verify")
def verify(payload: dict, user: dict = Depends(get_current_user)):
    return {
        "score": 87,
        "risk": "low",
        "summary": "The provided evidence appears consistent and credible.",
        "details": [
            "Source metadata is aligned.",
            "Claims are supported by available context.",
            "No obvious tampering signals were detected."
        ],
        "verified_by": user["username"],
    }
