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

## Deploy the frontend

The deployed frontend needs the URL of the deployed FastAPI backend. In your
hosting provider's environment variables, set `VITE_API_URL` to that public
backend URL (for example, `https://your-api.example.com`). Do not set it to
`127.0.0.1` or `localhost`, since those point to each visitor's device.

## Run the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows use .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
