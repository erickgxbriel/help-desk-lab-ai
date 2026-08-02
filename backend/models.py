import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String, default="mock")  # openai, ollama, mock
    api_key = Column(String, nullable=True)
    base_url = Column(String, nullable=True)
    model = Column(String, default="gpt-4o-mini")
    temperature = Column(Float, default=0.7)
    simulation_mode = Column(String, default="normal")

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(String, primary_key=True, index=True) # e.g. HD-1001
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String, index=True)
    priority = Column(String, index=True)      # LOW, MEDIUM, HIGH, CRITICAL
    difficulty = Column(String, index=True)    # N1, N2, DESAFIO
    user_profile = Column(String)              # LEIGO, APRESSADO, CONFUSO, GESTOR, DIRETOR, RH, FINANCEIRO, TECNICO, ANSIOSO
    context = Column(Text)                     # Internal context details for AI
    expected_solution = Column(Text)           # Expected resolution
    keywords = Column(Text)                    # Comma separated evaluation keywords
    status = Column(String, default="OPEN")    # OPEN, SOLVED, ABANDONED
    score = Column(Integer, nullable=True)
    feedback = Column(Text, nullable=True)     # JSON block containing details
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    messages = relationship("Message", back_populates="ticket", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ticket_id = Column(String, ForeignKey("tickets.id"))
    sender = Column(String)                    # AGENT, USER (Technician vs Customer)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    ticket = relationship("Ticket", back_populates="messages")
