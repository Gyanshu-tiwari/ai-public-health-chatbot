# PowerShell startup script for AI Health Chatbot Backend
Write-Host "Starting AI Health Chatbot Backend..." -ForegroundColor Green

# Set environment variables
$env:MY_EMAIL = "gyanshut007@gmail.com"
$env:MY_PASSWORD = "ftud vjzk ipta rweu"
$env:GEMINI_API_KEY = "AIzaSyAQiDDiLaW4TdFWduslXV0amI6KUkug6RE"

# Start the application
mvn spring-boot:run

Write-Host "Backend stopped." -ForegroundColor Red
