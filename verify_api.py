import requests
import time
import json
import sys

BASE_URL = "http://localhost:8080/api"
EMAIL = "test_verifier@example.com"
PASSWORD = "password123"
PHONE = "1234567890"

def log(obj):
    print(json.dumps(obj, indent=2))

def check_health():
    print(f"Checking {BASE_URL}/health...")
    for i in range(30):
        try:
            resp = requests.get(f"{BASE_URL}/health")
            if resp.status_code == 200:
                print("Backend is UP!")
                return True
        except requests.exceptions.ConnectionError:
            pass
        print(f"Waiting for backend... ({i+1}/30)")
        time.sleep(2)
    return False

def run_tests():
    if not check_health():
        print("Backend failed to start.")
        sys.exit(1)

    print("\n--- AUTH MODULE TESTS ---")
    
    # Register
    print("Test Register...")
    reg_payload = {
        "name": "Verifier",
        "email": EMAIL,
        "password": PASSWORD,
        "role": "USER"
    }
    resp = requests.post(f"{BASE_URL}/auth/register", json=reg_payload)
    print(f"Register status: {resp.status_code}")
    # We don't fail if already exists (400)
    
    # Login
    print("Test Login...")
    login_payload = {
        "email": EMAIL,
        "password": PASSWORD
    }
    resp = requests.post(f"{BASE_URL}/auth/login", json=login_payload)
    if resp.status_code != 200:
        print(f"Login failed: {resp.text}")
        sys.exit(1)
    
    data = resp.json()
    token = data.get("token")
    if not token:
        print("No token in login response")
        sys.exit(1)
    
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful. Token acquired.")

    # Me
    print("Test Get Me...")
    resp = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Get Me: {resp.status_code}")

    print("\n--- HEALTH DATA TESTS ---")
    # Diseases
    print("Test Get Diseases...")
    resp = requests.get(f"{BASE_URL}/health-data/diseases")
    print(f"Diseases: {resp.status_code}")
    
    # Prevention Tips
    print("Test Prevention Tips...")
    resp = requests.get(f"{BASE_URL}/health-data/prevention-tips")
    print(f"Prevention Tips: {resp.status_code}")
    
    # Emergency Symptoms
    print("Test Emergency Symptoms...")
    resp = requests.get(f"{BASE_URL}/health-data/emergency-symptoms")
    print(f"Emergency Symptoms: {resp.status_code}")

    print("\n--- ORS TESTS ---")
    # Hospitals
    print("Test Get Hospitals...")
    resp = requests.get(f"{BASE_URL}/ors/hospitals")
    print(f"Hospitals: {resp.status_code}")

    print("\n--- CHAT TESTS ---")
    # Create Chat
    print("Test Create Chat...")
    resp = requests.get(f"{BASE_URL}/chat/create", headers=headers)
    print(f"Create Chat: {resp.status_code}")
    
    print("\n--- GEMINI TEST ---")
    resp = requests.get(f"{BASE_URL}/test/gemini?message=Hello")
    print(f"Gemini Test: {resp.status_code}")

if __name__ == "__main__":
    run_tests()
