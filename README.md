
# MedLens
[🚀 Live Demo] https://medlens-ten.vercel.app/

MedLens is an AI-powered medical document understanding platform that helps users decode prescriptions and lab reports into clear, structured, and actionable information. By combining OCR, intelligent document parsing, and AI-driven explanations, MedLens extracts medicines, dosages, frequencies, and medical instructions, then presents them through an easy-to-understand dashboard with schedules, insights, and safety warnings.



## Features
📷 Prescription & Medical Report Upload
- Upload handwritten or printed prescriptions
- Support for image and PDF documents
- Instant document preview before processing 

🔍 OCR-Based Text Extraction
- Extract text from medical documents using OCR
- Detect medicine names, dosages, and instructions
- Editable extraction results for correcting OCR mistakes

💊 Intelligent Prescription Parsing
- Automatically identify prescribed medicines
- Extract dosage, frequency, duration, and route of administration
-  Interpret common medical abbreviations (OD, BD, TDS, SOS, HS, etc.)

🧠 AI-Powered Medical Translation
- Convert complex medical terminology into simple language
- Explain the purpose prescribed medicines
- Generate patient-friendly prescription summaries

🔒 Privacy & Security
- Secure document handling
- User-controlled data management
- Privacy-focused healthcare information processing


## Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL, Prisma

Authentication: JWT

AI & OCR: Groq AI, Tesseract OCR


## System Architecture
```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    │   (MedLens UI)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Express Backend │
                    │     REST API    │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Authentication  │  │  OCR Service    │  │   AI Analysis   │
│  JWT + bcrypt   │  │ (Tesseract OCR) │  │    Groq AI      │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────┬───────┴────────────┬───────┘
                      │
                      ▼

              ┌─────────────────┐
              │ PostgreSQL DB   │
              │ Prisma ORM      │
              │ Users           │
              │ Documents       │
              │ AI Analysis     │
              └─────────────────┘
```

## Future Enhancements
- Drug interaction detection
- Multilingual support
- Medication reminders
- Prescription history tracking
- Mobile application
- Advanced report analysis
