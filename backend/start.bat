@echo off
echo Starting AI Health Chatbot Backend...
echo.

REM Change to backend directory
cd /d "%~dp0"

REM Check if port 8080 is in use
REM netstat -ano | findstr :8080 >nul
REM if %errorlevel% == 0 (
REM     echo Port 8080 is already in use. Please stop the existing process.
REM     pause
REM     exit /b 1
REM )

REM Set environment variables
set MY_EMAIL=gyanshut007@gmail.com
set MY_PASSWORD=ftud vjzk ipta rweu
set GEMINI_API_KEY=AIzaSyCjqBUK8T8ycYT6g-WgsWcpGUA43x9tJ6g
set JWT_KEY=mySuperSecretKeyForJWTTokenGenerationThatIsAtLeast256BitsLongForSecurity1234567890

REM Start the application using simple POM
mvn -f pom-simple.xml spring-boot:run

pause
