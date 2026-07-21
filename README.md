# VeriTrust AI

VeriTrust AI is an AI-powered NGO and Donation Campaign Verification platform that helps users evaluate the credibility of NGOs and fundraising campaigns before making donations.

## Problem Statement

Millions of people donate online every year, but it is often difficult to determine whether an NGO or fundraising campaign is genuine. VeriTrust AI helps users make informed donation decisions by analyzing publicly available website information and generating an explainable trust assessment.

## Built With Codex

VeriTrust AI was developed with the assistance of OpenAI Codex for frontend development, backend implementation, debugging, API integration, and rapid feature iteration throughout the hackathon.

## Features

🔍 Verify NGO and donation campaign websites
🤖 AI-assisted credibility analysis
🔒 HTTPS and SSL verification
📄 Website metadata analysis
📞 Contact and About page detection
📊 Trust Score generation
📈 Confidence level assessment
💡 Explainable verification results

## Technology Stack

Frontend
React
Vite
Tailwind CSS
Backend
FastAPI
Python
HTML Metadata Parser
REST API


## How it Works

User enters an NGO website URL.
The backend validates the URL.
Public website metadata is collected.
Multiple trust indicators are analyzed.

## VeriTrust AI generates:

Trust Score
Confidence Level
Positive Signals
Warnings
Verification Summary

## Future Improvements

WHOIS domain age lookup
NGO registration database integration
OCR verification for uploaded certificates
AI chatbot for donation guidance

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

## Future Scope

- WHOIS domain age verification
- OCR-based NGO certificate verification
- Government NGO registry integration
- AI-powered donation risk analysis
- Browser extension for donation website verification