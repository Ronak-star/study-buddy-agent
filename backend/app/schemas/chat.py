from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    thread_id: str = Field(..., description="Conversation/session identifier")
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    thread_id: str
    reply: str


class SessionOut(BaseModel):
    thread_id: str
    title: str | None = None
    created_at: str | None = None
