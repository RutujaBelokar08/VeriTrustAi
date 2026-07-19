# VeriTrust AI

VeriTrust AI is a starter full-stack project for verifying digital trust signals across documents, media, and content metadata.

## Structure

- frontend: React + Vite + Tailwind app
- backend: FastAPI service with health and verification endpoints

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

## Run the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows use .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
