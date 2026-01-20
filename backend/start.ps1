# PowerShell startup script for AI Health Chatbot Backend
Write-Host "Starting AI Health Chatbot Backend..." -ForegroundColor Green

# Change to backend directory
Set-Location $PSScriptRoot

# Check if port 8080 is in use
$portCheck = netstat -ano | findstr ":8080"
if ($portCheck) {
    Write-Host "Port 8080 is already in use. Please stop the existing process." -ForegroundColor Red
    Read-Host "Press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Set environment variables
$env:MY_EMAIL = "gyanshut007@gmail.com"
$env:MY_PASSWORD = "ftud vjzk ipta rweu"
$env:GEMINI_API_KEY = "AIzaSyC3M13OeH-AMOzSlnHNLuDDVN-o4XI65mY"
$env:JWT_KEY = "mySuperSecretKeyForJWTTokenGenerationThatIsAtLeast256BitsLongForSecurity1234567890"

# Start the application
Write-Host "Starting Spring Boot application..." -ForegroundColor Green
mvn -f pom-simple.xml spring-boot:run

Write-Host "Backend stopped." -ForegroundColor Red
