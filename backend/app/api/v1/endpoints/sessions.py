import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models import ChatSession
from app.db.session import get_db
from app.schemas.chat import SessionOut

router = APIRouter()


@router.post("/sessions", response_model=SessionOut)
def create_session(db: Session = Depends(get_db)):
    thread_id = str(uuid.uuid4())
    # NOTE: user_id hardcoded here; wire up real auth dependency in production
    session = ChatSession(thread_id=thread_id, user_id="demo-user", title="New chat")
    db.add(session)
    db.commit()
    db.refresh(session)
    return SessionOut(thread_id=session.thread_id, title=session.title,
                       created_at=session.created_at.isoformat())


@router.get("/sessions", response_model=list[SessionOut])
def list_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()
    return [
        SessionOut(thread_id=s.thread_id, title=s.title, created_at=s.created_at.isoformat())
        for s in sessions
    ]
