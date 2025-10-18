# backend/test_app.py
import pytest
import json
from app import app

API_TOKEN = "dev-token"  # must match backend default or .env

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

def test_ping(client):
    res = client.get("/api/ping")
    assert res.status_code == 200
    data = res.get_json()
    assert data["msg"] == "pong"

def test_get_tasks_initial(client):
    res = client.get("/api/v1/tasks/")
    assert res.status_code == 200
    data = res.get_json()
    assert "tasks" in data and isinstance(data["tasks"], list)

def test_post_unauthorized(client):
    payload = {"title": "noauth", "description": "should fail", "completed": False}
    res = client.post("/api/v1/tasks/", data=json.dumps(payload), content_type="application/json")
    assert res.status_code == 401
    data = res.get_json()
    assert data["ok"] is False

def create_task(client, title="t1", description="desc"):
    payload = {"title": title, "description": description, "completed": False}
    headers = {"Authorization": f"Bearer {API_TOKEN}", "Content-Type": "application/json"}
    res = client.post("/api/v1/tasks/", data=json.dumps(payload), headers=headers)
    assert res.status_code == 201
    return res.get_json()["task"]

def test_post_authorized_and_get(client):
    task = create_task(client, "auth-create", "created via test")
    assert "id" in task
    # verify appears in list
    res = client.get("/api/v1/tasks/")
    data = res.get_json()
    assert any(t["id"] == task["id"] for t in data["tasks"])

def test_put_and_delete_flow(client):
    # create
    task = create_task(client, "to-update", "update me")
    tid = task["id"]

    # update title
    headers = {"Authorization": f"Bearer {API_TOKEN}", "Content-Type": "application/json"}
    upd = {"title": "updated-title"}
    res = client.put(f"/api/v1/tasks/{tid}", data=json.dumps(upd), headers=headers)
    assert res.status_code == 200
    j = res.get_json()
    assert j["ok"] is True
    assert j["task"]["title"] == "updated-title"

    # delete
    res2 = client.delete(f"/api/v1/tasks/{tid}", headers={"Authorization": f"Bearer {API_TOKEN}"})
    assert res2.status_code == 200
    j2 = res2.get_json()
    assert j2["ok"] is True

    # ensure it's not found anymore
    res3 = client.get(f"/api/v1/tasks/{tid}")
    assert res3.status_code in (400, 404)  # either invalid id or not found depending on tasks_store behavior
