import logging

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from auth_store import authenticate_user, create_user, get_user_by_username, init_db
from services.verification import analyze_site, fetch_site_metadata, is_reachable, normalize_metadata, validate_url

logger = logging.getLogger("veritrust")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

app = FastAPI(title="VeriTrust AI API")
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {request.method} {request.url} -> {response.status_code}")
    return response

security = HTTPBearer()


class LoginRequest(BaseModel):
    username: str
    password: str


class SignupRequest(BaseModel):
    username: str
    password: str
    role: str = "user"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    role: str = "user"


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication token")

    user = get_user_by_username(credentials.credentials)
    if user:
        return {"username": user["username"], "role": user["role"]}

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication token")


@app.get("/health")
def health():
    return {"status": "ok", "service": "veritrust-ai"}


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    auth_result = authenticate_user(payload.username, payload.password)
    if not auth_result["success"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=auth_result["message"])

    return {
        "access_token": auth_result["username"],
        "username": auth_result["username"],
        "role": auth_result["role"],
    }


@app.post("/auth/signup", response_model=TokenResponse)
def signup(payload: SignupRequest):
    if payload.role not in {"user", "admin"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role must be either 'user' or 'admin'.")

    created = create_user(payload.username, payload.password, payload.role)
    if not created["success"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=created["message"])

    return {
        "access_token": created["username"],
        "username": created["username"],
        "role": created["role"],
    }


@app.get("/auth/me")
def me(user: dict = Depends(get_current_user)):
    return user


@app.post("/verify")
def verify(payload: dict, user: dict = Depends(get_current_user)):
    if not payload.get("value"):
        raise HTTPException(status_code=400, detail="Please provide a website or campaign URL.")

    value = str(payload["value"]).strip()
    invalid_message = validate_url(value)
    if invalid_message:
        return {
            "status": "invalid",
            "title": "Invalid URL",
            "summary": invalid_message,
            "score": None,
            "confidence": "Low",
            "positive_signals": [],
            "warnings": [invalid_message],
            "missing_information": ["A valid website URL is required"],
            "details": [invalid_message],
            "verified_by": user["username"],
            "evidence": {},
        }

    if not is_reachable(value):
        return {
            "status": "unreachable",
            "title": "Website could not be accessed",
            "summary": "Website could not be reached.",
            "score": None,
            "confidence": "Low",
            "recommendation": "Check the URL or try again later.",
            "positive_signals": [],
            "warnings": ["Website unavailable"],
            "missing_information": ["The server could not reach the website"],
            "details": ["Website could not be accessed."],
            "verified_by": user["username"],
            "evidence": {},
            "reason": ["Website unreachable"],
        }

    metadata = fetch_site_metadata(value)
    if metadata.get("error"):
        return {
            "status": "unable",
            "title": "Unable to verify",
            "summary": metadata.get("error", "Unable to fetch website metadata."),
            "score": None,
            "confidence": "Low",
            "recommendation": "Please review the website manually or verify the page content.",
            "positive_signals": [],
            "warnings": [metadata.get("error")],
            "missing_information": ["Insufficient metadata available"],
            "details": [metadata.get("error")],
            "verified_by": user["username"],
            "evidence": {},
            "reason": [metadata.get("error")],
        }

    analysis = analyze_site(metadata)
    result = {
        "status": analysis["status"],
        "title": analysis["title"],
        "summary": analysis["summary"],
        "score": analysis["score"],
        "confidence": analysis["confidence"],
        "recommendation": analysis.get("recommendation", ""),
        "positive_signals": analysis["positive_signals"],
        "warnings": analysis["warnings"],
        "missing_information": analysis["missing_information"],
        "details": analysis["positive_signals"] + analysis["warnings"] + analysis["missing_information"],
        "verified_by": user["username"],
        "evidence": analysis["evidence"],
        "reason": analysis.get("reason", []),
    }

    if analysis["status"] == "failed":
        result["reason"] = analysis["reason"]
    return result
