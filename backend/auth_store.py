import os
import sqlite3
from datetime import datetime, timezone
from typing import Optional


def get_connection() -> sqlite3.Connection:
    db_path = os.getenv("VERITRUST_DB_PATH", os.path.join(os.path.dirname(__file__), "veritrust.db"))
    conn = sqlite3.connect(db_path, timeout=30, isolation_level=None)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    return conn


def init_db() -> None:
    conn = get_connection()
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user',
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()
    finally:
        conn.close()

    seed_default_users()


def seed_default_users() -> None:
    default_users = [
        ("admin", "Admin@2026", "admin"),
        ("user", "User@2026", "user"),
    ]

    conn = get_connection()
    try:
        existing = conn.execute("SELECT COUNT(*) AS count FROM users").fetchone()["count"]
        if existing > 0:
            return

        for username, password, role in default_users:
            conn.execute(
                "INSERT INTO users (username, password_hash, role, created_at) VALUES (?, ?, ?, ?)",
                (username, hash_password(password), role, datetime.now(timezone.utc).isoformat()),
            )
        conn.commit()
    finally:
        conn.close()


def hash_password(password: str) -> str:
    import hashlib

    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def create_user(username: str, password: str, role: str = "user") -> dict:
    if not username or not password:
        return {"success": False, "message": "Username and password are required."}

    normalized_username = username.strip().lower()
    if len(normalized_username) < 3:
        return {"success": False, "message": "Username must be at least 3 characters long."}

    if len(password) < 6:
        return {"success": False, "message": "Password must be at least 6 characters long."}

    try:
        conn = get_connection()
        try:
            cursor = conn.execute(
                "INSERT INTO users (username, password_hash, role, created_at) VALUES (?, ?, ?, ?)",
                (normalized_username, hash_password(password), role.lower(), datetime.now(timezone.utc).isoformat()),
            )
            conn.commit()
            return {"success": True, "user_id": cursor.lastrowid, "username": normalized_username, "role": role.lower()}
        finally:
            conn.close()
    except sqlite3.IntegrityError:
        return {"success": False, "message": "That username is already taken."}


def authenticate_user(username: str, password: str) -> dict:
    normalized_username = username.strip().lower()
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT username, password_hash, role FROM users WHERE username = ?",
            (normalized_username,),
        ).fetchone()

        if not row:
            return {"success": False, "message": "Invalid username or password"}

        if row["password_hash"] != hash_password(password):
            return {"success": False, "message": "Invalid username or password"}

        return {"success": True, "username": row["username"], "role": row["role"]}
    finally:
        conn.close()


def get_user_by_username(username: str) -> Optional[dict]:
    normalized_username = username.strip().lower()
    conn = get_connection()
    try:
        row = conn.execute("SELECT username, role FROM users WHERE username = ?", (normalized_username,)).fetchone()
        if not row:
            return None
        return {"username": row["username"], "role": row["role"]}
    finally:
        conn.close()
