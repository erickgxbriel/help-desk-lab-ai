import pytest
from fastapi.testclient import TestClient
from main import app
from database import SessionLocal
from models import Ticket, Message

client = TestClient(app)

def test_hd1020_complete_dialog_flow():
    """Simulate complete technician conversation on HD-1020."""
    # Reset ticket
    client.post("/api/tickets/HD-1020/restart")

    # Step 1: Investigation question
    r1 = client.post("/api/tickets/HD-1020/chat", json={
        "content": "Olá, por gentileza, qual é o domínio de e-mail do cliente?"
    })
    assert r1.status_code == 200
    msgs1 = r1.json()
    assert "@propostas-parceiro.com.br" in msgs1[-1]["content"]
    assert "Deu certo" not in msgs1[-1]["content"] # Must NOT resolve yet

    # Step 2: Technician provides instruction
    r2 = client.post("/api/tickets/HD-1020/chat", json={
        "content": "No Outlook, ir na aba Página Inicial > Lixo Eletrônico > 'Opções de Lixo Eletrônico' > aba 'Remetentes Confiáveis' > Adicionar o domínio '@propostas-parceiro.com.br' e salvar."
    })
    assert r2.status_code == 200
    msgs2 = r2.json()
    # Now it MUST confirm resolution
    assert "Remetentes Confiáveis" in msgs2[-1]["content"] or "Deu certo" in msgs2[-1]["content"]

def test_hd1013_ip_conflict_dialog_flow():
    """Simulate IP conflict conversation on HD-1013."""
    client.post("/api/tickets/HD-1013/restart")

    # Step 1: Question
    r1 = client.post("/api/tickets/HD-1013/chat", json={
        "content": "Abra o Prompt de Comando (CMD) e digite 'ipconfig'. Qual endereço IPv4 aparece?"
    })
    assert r1.status_code == 200
    msgs1 = r1.json()
    assert "192.168.1.105" in msgs1[-1]["content"]
    assert "voltou" not in msgs1[-1]["content"]

    # Step 2: Instruction
    r2 = client.post("/api/tickets/HD-1013/chat", json={
        "content": "Execute os comandos ipconfig /release e depois ipconfig /renew no CMD."
    })
    assert r2.status_code == 200
    msgs2 = r2.json()
    assert "voltou" in msgs2[-1]["content"] or "192.168.1.142" in msgs2[-1]["content"]

def test_hd1011_bsod_dialog_flow():
    """Simulate BSOD conversation on HD-1011."""
    client.post("/api/tickets/HD-1011/restart")

    # Step 1: Question
    r1 = client.post("/api/tickets/HD-1011/chat", json={
        "content": "Qual o código de erro que aparece na tela azul?"
    })
    assert r1.status_code == 200
    msgs1 = r1.json()
    assert "MEMORY_MANAGEMENT" in msgs1[-1]["content"]

    # Step 2: Solution
    r2 = client.post("/api/tickets/HD-1011/chat", json={
        "content": "Execute a ferramenta mdsched.exe para testar a memória RAM."
    })
    assert r2.status_code == 200
    msgs2 = r2.json()
    assert "mdsched" in msgs2[-1]["content"] or "memória" in msgs2[-1]["content"]
