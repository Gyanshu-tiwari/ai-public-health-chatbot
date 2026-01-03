# Test health endpoint
Write-Host "Testing Health Endpoint..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/chat/health" -Method Get
    Write-Host "Health Check successful" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json)
} catch {
    Write-Host "Health Check Failed: $_" -ForegroundColor Red
}

# Test chat endpoint
Write-Host "`nTesting Chat Endpoint..." -ForegroundColor Green
try {
    $body = @{
        message = "Hello, I have a cough"
        language = "en"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -ContentType "application/json" -Body $body
    Write-Host "Chat Response successful" -ForegroundColor Green
} catch {
    Write-Host "Chat Test Failed: $_" -ForegroundColor Red
}

# Test symptoms endpoint
Write-Host "`nTesting Symptoms Endpoint..." -ForegroundColor Green
try {
    $body = @{
        symptoms = @("fever", "cough")
        duration = "2 days"
        severity = "moderate"
        age = 35
        language = "en"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/symptoms/check" -Method Post -ContentType "application/json" -Body $body
    Write-Host "Symptoms Check successful" -ForegroundColor Green
} catch {
    Write-Host "Symptoms Test Failed: $_" -ForegroundColor Red
}

Write-Host "`nAll tests completed!" -ForegroundColor Yellow
