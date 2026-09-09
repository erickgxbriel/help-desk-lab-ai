from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SettingsBase(BaseModel):
    provider: str
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    model: str
    temperature: float
    simulation_mode: str

class SettingsSchema(SettingsBase):
    id: int

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    sender: str = "AGENT"  # AGENT or USER
    content: str

class MessageCreate(BaseModel):
    content: str
    sender: str = "AGENT"

class MessageSchema(MessageBase):
    id: int
    ticket_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class TicketBase(BaseModel):
    title: str
    description: str
    category: str
    priority: str
    difficulty: str
    user_profile: str

class TicketCreateSchema(BaseModel):
    category: Optional[str] = None
    priority: Optional[str] = None
    difficulty: Optional[str] = None
    user_profile: Optional[str] = None

class TicketSchema(TicketBase):
    id: str
    status: str
    score: Optional[int] = None
    feedback: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class TicketDetailSchema(TicketSchema):
    context: str
    expected_solution: str
    keywords: str
    messages: List[MessageSchema] = []

    class Config:
        from_attributes = True

class TicketResolveSchema(BaseModel):
    diagnosis: str

class EvaluationResponse(BaseModel):
    score: int
    strengths: List[str]
    improvements: List[str]
    diagnosis_probable: str
    expected_solution: str
    feedback_text: str

class DashboardStats(BaseModel):
    total_tickets: int
    open_tickets: int
    completed_tickets: int
    avg_score: float
    recent_tickets: List[TicketSchema]
