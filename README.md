<div align="center">

# 🚀 Study Buddy Agent

**An AI-powered study assistant built with LangGraph, FastAPI, and React**

Ask questions, get summaries, generate flashcards, and do quick calculations — powered by a tool-using LLM agent with persistent conversation memory.

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent-purple.svg)](https://langchain-ai.github.io/langgraph/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Features

- 🤖 **Tool-using AI agent** built with LangGraph's `create_react_agent`
- 💾 **Persistent memory** per conversation thread (SQLite checkpointing)
- 🔧 **Custom study tools** — word counter, calculator, note summarizer, flashcard generator
- ⚡ **FastAPI backend** with a clean, layered architecture (routes → services → agent → data)
- 🎨 **React + Tailwind frontend** with a ChatGPT-style chat UI and session sidebar
- 🐳 **Docker-ready** for one-command local or production deployment
- ☁️ **CI/CD** via GitHub Actions, deployable to AWS EC2

---

## 🏗️ Architecture

```
┌─────────────┐      REST/SSE      ┌──────────────┐      ┌──────────────┐
│   React     │ ─────────────────▶ │   FastAPI    │ ───▶ │  LangGraph   │
│  Frontend   │ ◀───────────────── │   Backend    │ ◀─── │    Agent     │
└─────────────┘                    └──────┬───────┘      └──────┬───────┘
                                           │                     │
                                    ┌──────▼──────┐      ┌───────▼────────┐
                                    │  MySQL /    │      │  SQLite        │
                                    │  SQLite DB  │      │  Checkpointer  │
                                    │ (sessions)  │      │  (chat memory) │
                                    └─────────────┘      └────────────────┘
```

**Backend layers:** `api/` (routes) → `services/` (business logic) → `agent/` (LangGraph graph + tools) → `db/` (persistence)

---

## 📁 Project Structure

```
study-buddy-agent/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI entrypoint
│   │   ├── core/                   # config, security, logging
│   │   ├── agent/                  # LangGraph agent, tools, checkpointer
│   │   ├── api/v1/endpoints/       # chat, sessions, health routes
│   │   ├── db/                     # SQLAlchemy models & session
│   │   ├── schemas/                # Pydantic request/response models
│   │   └── services/               # business logic layer
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/             # ChatWindow, Sidebar, MessageBubble
│   │   ├── pages/                  # Chat page
│   │   ├── api/                    # API client
│   │   └── hooks/                  # useChat hook
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Agent orchestration | [LangGraph](https://langchain-ai.github.io/langgraph/) (`create_react_agent`) |
| LLM provider | [Groq](https://console.groq.com/) (Llama models) — swappable for Anthropic/OpenAI |
| Backend | FastAPI, SQLAlchemy, Pydantic v2 |
| Database | SQLite (dev) / MySQL / PostgreSQL (production) |
| Frontend | React 18, Vite, Tailwind CSS |
| Auth | JWT (python-jose, passlib) |
| Infra | Docker, Docker Compose, Nginx, GitHub Actions, AWS EC2 |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.11** (recommended — newer versions may lack prebuilt wheels for some dependencies)
- **Node.js 18+**
- A free [Groq API key](https://console.groq.com/keys) (or an Anthropic/OpenAI key if you swap providers)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/study-buddy-agent.git
cd study-buddy-agent
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv

# Activate the virtual environment
source .venv/bin/activate        # macOS/Linux
.venv\Scripts\Activate.ps1       # Windows PowerShell

pip install -r requirements.txt
cp .env.example .env             # then add your API key inside
uvicorn app.main:app --reload --port 8000
```

Backend runs at **http://localhost:8000** — API docs at **http://localhost:8000/docs**.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at **http://localhost:5173**.

### 4. Try it out

Open the app, click **New chat**, and ask something like:

> "Words in 'I love agents'? then 6*7"

The agent will use its `word_count` and `multiply` tools and reply with the answer.

---

## 🔑 Environment Variables

**`backend/.env`**

```dotenv
ENV=development
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL=sqlite:///./studybuddy.db
SQLITE_CHECKPOINT_PATH=./checkpoints.sqlite
JWT_SECRET=change-this-to-a-random-secret
ALLOWED_ORIGINS=http://localhost:5173
LOG_LEVEL=INFO
```

**`frontend/.env`**

```dotenv
VITE_API_BASE_URL=/api/v1
```

> ⚠️ Never commit `.env` files. `.env.example` files are provided as templates.

---

## 🐳 Run with Docker Compose

```bash
cp backend/.env.example backend/.env   # fill in your API key
docker compose up -d --build
```

- Frontend: **http://localhost**
- Backend: **http://localhost:8000**

View logs:
```bash
docker compose logs -f backend
```

---

## ☁️ Deploying to AWS EC2

1. Launch an **Ubuntu 22.04** EC2 instance (t3.medium or larger). Open ports **22, 80, 443** in the security group.
2. SSH in and install Docker:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
   sudo usermod -aG docker $USER && newgrp docker
   ```
3. Clone the repo and configure secrets:
   ```bash
   git clone https://github.com/<your-username>/study-buddy-agent.git
   cd study-buddy-agent
   cp backend/.env.example backend/.env   # edit with real secrets
   ```
4. Start the stack:
   ```bash
   docker compose up -d --build
   ```
5. Point your domain's DNS **A record** at the EC2 public IP, then issue a TLS cert:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```
6. Add these repo secrets under **Settings → Secrets → Actions** to enable auto-deploy on push to `main`:
   - `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`

The included [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) runs backend tests, builds the frontend, and deploys via SSH automatically.

---

## 🧪 Running Tests

```bash
cd backend
pytest -q
```

---

## 🧩 Available Agent Tools

| Tool | Description |
|---|---|
| `word_count` | Counts words in a piece of text |
| `multiply` | Multiplies two numbers |
| `summarize_notes` | Condenses study notes into a few sentences |
| `make_flashcards` | Generates flashcard prompts for a topic |

Add new tools in `backend/app/agent/tools/` and register them in `ALL_TOOLS` inside `tools/__init__.py`.

---

## 🩹 Troubleshooting

| Problem | Fix |
|---|---|
| `numpy`/build errors on install | Use Python 3.11 — some ML deps lack prebuilt wheels for the newest Python versions |
| `NotImplementedError: SqliteSaver does not support async` | Use `AsyncSqliteSaver` (already configured in `checkpointer.py`) with `pip install aiosqlite` |
| `Could not resolve authentication method` | Your API key env var is empty — check `.env` |
| `Your credit balance is too low` | Add billing credits to your LLM provider account, or switch providers |
| Model calls an undefined tool (e.g. `brave_search`) | Some hosted models have built-in tool behaviors — pin the system prompt to explicitly restrict available tools, or switch models |
| CORS errors in browser | Confirm `ALLOWED_ORIGINS` in `backend/.env` matches your frontend URL |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributing

Contributions are welcome! Please open an issue or submit a PR.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request
