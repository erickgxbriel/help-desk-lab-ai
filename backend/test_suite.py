import pytest
from fastapi.testclient import TestClient
from main import app
from database import SessionLocal
from models import Ticket, Settings
from seed import seed_db

client = TestClient(app)

def test_api_health_and_stats():
    """Verify stats endpoint returns valid aggregate data."""
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_tickets" in data
    assert "open_tickets" in data
    assert "completed_tickets" in data
    assert "avg_score" in data
    assert isinstance(data["recent_tickets"], list)
    assert data["total_tickets"] >= 10

def test_api_list_tickets():
    """Verify list tickets returns 20 seeded tickets."""
    response = client.get("/api/tickets")
    assert response.status_code == 200
    tickets = response.json()
    assert len(tickets) >= 15
    ticket_ids = [t["id"] for t in tickets]
    assert "HD-1001" in ticket_ids
    assert "HD-1011" in ticket_ids # BSOD
    assert "HD-1013" in ticket_ids # IP Conflict
    assert "HD-1016" in ticket_ids # APIPA
    assert "HD-1017" in ticket_ids # GPO
    assert "HD-1018" in ticket_ids # BitLocker

def test_api_ticket_details():
    """Verify single ticket detail endpoint."""
    response = client.get("/api/tickets/HD-1011")
    assert response.status_code == 200
    ticket = response.json()
    assert ticket["id"] == "HD-1011"
    assert "MEMORY_MANAGEMENT" in ticket["title"]
    assert "messages" in ticket

def test_chat_interaction_mock():
    """Verify sending a chat message to a ticket produces a simulated response."""
    response = client.post("/api/tickets/HD-1011/chat", json={"content": "Qual o código de erro que aparece na tela azul?"})
    assert response.status_code == 200
    messages = response.json()
    assert len(messages) >= 2
    last_msg = messages[-1]
    assert last_msg["sender"] == "USER"
    assert "MEMORY_MANAGEMENT" in last_msg["content"] or "tela azul" in last_msg["content"]

def test_resolve_ticket_and_evaluation():
    """Verify ticket resolution and quality audit evaluation."""
    response = client.post("/api/tickets/HD-1013/resolve", json={
        "diagnosis": "Conflito de IP resolvido executando ipconfig /release e ipconfig /renew no CMD para renovar via DHCP."
    })
    assert response.status_code == 200
    eval_result = response.json()
    assert "score" in eval_result
    assert eval_result["score"] >= 70
    assert len(eval_result["strengths"]) > 0
    assert "expected_solution" in eval_result

def test_settings_providers_support():
    """Verify settings endpoint accepts openrouter, gemini, openai and mock."""
    payload = {
        "provider": "openrouter",
        "api_key": "sk-or-test-key",
        "base_url": "",
        "model": "meta-llama/llama-3.3-70b-instruct",
        "temperature": 0.7,
        "simulation_mode": "normal"
    }
    response = client.post("/api/settings", json=payload)
    assert response.status_code == 200
    saved = response.json()
    assert saved["provider"] == "openrouter"
    assert saved["model"] == "meta-llama/llama-3.3-70b-instruct"

    # Reset back to mock for testing safety
    client.post("/api/settings", json={
        "provider": "mock",
        "api_key": "",
        "base_url": "",
        "model": "gpt-4o-mini",
        "temperature": 0.7,
        "simulation_mode": "normal"
    })
