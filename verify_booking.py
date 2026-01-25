import requests
import json
import time

BASE_URL = "http://localhost:8080/api"

def log(obj):
    print(json.dumps(obj, indent=2))

def verify_booking():
     # 1. Initialize Data
    print("Initializing Data...")
    try:
        resp = requests.post(f"{BASE_URL}/ors/initialize-data")
        if resp.status_code != 200:
            print(f"Init failed: {resp.text}")
            return
    except Exception as e:
        print(f"Init exception: {e}")
        return

    # 2. Get Hospital
    print("Getting Hospitals...")
    resp = requests.get(f"{BASE_URL}/ors/hospitals")
    hospitals = resp.json().get("hospitals", [])
    if not hospitals:
        print("No hospitals found")
        return
    hospital = hospitals[0]
    print(f"Selected Hospital: {hospital['name']}")

    # 3. Get Department
    print("Getting Departments...")
    resp = requests.get(f"{BASE_URL}/ors/hospitals/{hospital['id']}/departments")
    departments = resp.json().get("departments", [])
    if not departments:
        print("No departments found")
        return
    department = departments[0]
    print(f"Selected Dept: {department['name']}")

    # 4. Get Doctor
    print("Getting Doctors...")
    resp = requests.get(f"{BASE_URL}/ors/hospitals/{hospital['id']}/departments/{department['id']}/doctors")
    doctors = resp.json().get("doctors", [])
    if not doctors:
        print("No doctors found")
        return
    doctor = doctors[0]
    print(f"Selected Doctor: {doctor['name']}")
    
    # Payload base
    payload = {
        "hospitalId": hospital['id'],
        "departmentId": department['id'],
        "doctorId": doctor['id'],
        "patientName": "Test Patient",
        "phoneNumber": "9876543210",
        "email": "test@example.com",
        "age": "25",
        "gender": "Male",
        "timeSlot": "10:00 AM",
        "consultationType": "OFFLINE"
    }

    # Test 1: Simple Date String
    print("\n--- TEST 1: Simple Date string (YYYY-MM-DD) ---")
    payload["appointmentDate"] = "2026-02-15"
    resp = requests.post(f"{BASE_URL}/ors/appointments", json=payload)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")

    # Test 2: ISO Date String (What I used before - Should Fail due to .000Z)
    print("\n--- TEST 2: ISO Date string (with Z) ---")
    payload["appointmentDate"] = "2026-02-15T00:00:00.000Z"
    resp = requests.post(f"{BASE_URL}/ors/appointments", json=payload)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")

    # Test 3: Correct Format (YYYY-MM-DDTHH:mm:ss)
    print("\n--- TEST 3: Correct Format (No Z) ---")
    payload["appointmentDate"] = "2026-02-15T00:00:00"
    resp = requests.post(f"{BASE_URL}/ors/appointments", json=payload)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")

if __name__ == "__main__":
    verify_booking()
