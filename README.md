# 🚀 Study Buddy Agent

A production-grade AI tutoring assistant built with **LangGraph**, **FastAPI**, and **React**.

## Stack
- **Agent**: LangGraph `create_react_agent` + Claude (Anthropic) + SQLite/Postgres checkpointing
- **Backend**: FastAPI, SQLAlchemy, MySQL/SQLite, JWT auth
- **Frontend**: React (Vite), Tailwind CSS, shadcn-style components
- **Infra**: Docker, Docker Compose, Nginx, GitHub Actions, AWS EC2

## Local Development

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # fill in ANTHROPIC_API_KEY etc.
uvicorn app.main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
App: http://localhost:5173

## Run everything with Docker Compose
```bash
cp backend/.env.example backend/.env   # fill in secrets
docker compose up -d --build
```
- Frontend: http://localhost
- Backend: http://localhost:8000

## Deploying to AWS EC2

1. Launch an Ubuntu 22.04 EC2 instance (t3.medium+), open ports 22, 80, 443 in the security group.
2. SSH in and install Docker + Docker Compose:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
   sudo usermod -aG docker $USER && newgrp docker
   ```
3. Clone the repo:
   ```bash
   git clone https://github.com/<you>/study-buddy-agent.git
   cd study-buddy-agent
   cp backend/.env.example backend/.env   # edit with real secrets
   ```
4. Start the stack:
   ```bash
   docker compose up -d --build
   ```
5. Point your domain's DNS A record at the EC2 public IP, then issue TLS certs:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```
6. Add GitHub secrets `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` to enable the CI/CD workflow in `.github/workflows/ci-cd.yml`, which auto-deploys on every push to `main`.

## Project Structure
See inline comments in each module — the backend follows a layered architecture:
`api/` (routes) → `services/` (business logic) → `agent/` (LangGraph) → `db/` (persistence).

## License
MIT
