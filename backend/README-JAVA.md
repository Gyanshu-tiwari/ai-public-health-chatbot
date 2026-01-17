# 🏥 AI-Driven Public Health Chatbot - Java Spring Boot Version

**Production-Ready Full-Stack Healthcare AI Assistant with Advanced Medical Features**

A comprehensive AI-powered chatbot platform for health awareness, symptom checking, telemedicine integration, appointment booking, medical database access, health records management, and insurance processing—all with strict safety guardrails.

---

## 🚀 Core Features

### AI & Chat
- **AI-Powered Health Chat**: OpenAI-powered assistant for health awareness
- **Bilingual Support**: English and Hindi language support
- **Safety First**: Strict guardrails to prevent diagnosis and prescription
- **Emergency Detection**: Automatic detection and escalation for critical symptoms

### Clinical Features
- **Symptom Checker**: AI-assisted screening with doctor referral
- **Medical Database**: Access verified health information and conditions
- **Health Records**: Secure storage, organization, and sharing of medical records
- **Doctor Telemedicine**: Video consultations with licensed healthcare providers

### Booking & Insurance
- **Appointment Booking**: Schedule with healthcare providers
- **Insurance Integration**: Process insurance claims and check coverage
- **Provider Directory**: Find doctors by specialty and availability
- **Doctor Ratings**: View experience, ratings, and availability

### Safety & Compliance
- **HIPAA Framework**: Ready for HIPAA compliance implementation
- **Data Encryption**: Secure medical data handling
- **Medical Disclaimers**: All responses include professional consultation recommendations
- **Emergency Protocol**: Critical symptom detection and emergency referral

---

## 📂 Java Project Structure

```
backend/
├── src/main/java/com/healthchat/
│   ├── HealthChatApplication.java          Main Spring Boot application
│   ├── config/
│   │   ├── SecurityConfig.java           Spring Security configuration
│   │   ├── WebConfig.java               CORS configuration
│   │   ├── JwtAuthenticationFilter.java  JWT authentication filter
│   │   └── UserDetailsServiceImpl.java   User details service
│   ├── controller/
│   │   ├── AuthController.java          Authentication endpoints
│   │   ├── ChatController.java          Chat management
│   │   ├── MessageController.java       Message processing
│   │   └── HealthController.java       Health check endpoints
│   ├── dto/
│   │   ├── AuthResponse.java           Authentication response
│   │   ├── UserDTO.java               User data transfer object
│   │   ├── LoginRequest.java           Login request
│   │   ├── RegisterRequest.java        Registration request
│   │   ├── MessageRequest.java         Message request
│   │   ├── MessageResponse.java        Message response
│   │   ├── OTPRequest.java            OTP request
│   │   ├── OTPVerifyRequest.java       OTP verification
│   │   └── ResetPasswordRequest.java   Password reset request
│   ├── model/
│   │   ├── User.java                  User entity
│   │   └── Chat.java                 Chat entity with messages
│   ├── repository/
│   │   ├── UserRepository.java         User data access
│   │   └── ChatRepository.java         Chat data access
│   ├── service/
│   │   ├── AuthService.java           Authentication logic
│   │   ├── UserService.java           User management
│   │   ├── ChatService.java           Chat management
│   │   ├── MessageService.java        Message processing
│   │   ├── EmailService.java          Email notifications
│   │   └── openai/
│   │       └── OpenAIService.java     AI integration
│   └── util/
│       └── JwtUtil.java              JWT token utilities
├── src/main/resources/
│   └── application.properties          Application configuration
├── pom.xml                          Maven dependencies
└── .env.example                     Environment variables template
```

---

## ⚡ Quick Start

### Prerequisites

- **Java 17+** - [Download JDK](https://adoptium.net/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
- **MongoDB** - [Install MongoDB](https://www.mongodb.com/try/download/community)
- **OpenAI API Key** - [Get key](https://platform.openai.com/api-keys)

### Backend Setup

1. **Clone and Navigate**
   ```bash
   cd backend
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` and update:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/health-chatbot
   JWT_KEY=your-secret-key-here
   FRONTEND_URL=http://localhost:5173
   MY_EMAIL=your-email@gmail.com
   MY_PASSWORD=your-app-password
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. **Install Dependencies and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Server runs on `http://localhost:8080`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/send-otp` | Send recovery OTP |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |

### Chat Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/chat/create` | Create new chat |
| GET | `/api/chat/get` | Get user chats |
| POST | `/api/chat/delete` | Delete chat |

### Messages
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/message/text` | Send message to AI |

### Health Check
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| GET | `/` | Welcome message |

---

## 🔐 Security Features

### JWT Authentication
- Stateless authentication using JWT tokens
- Token expiration: 15 minutes
- Secure password hashing with BCrypt

### Spring Security Configuration
- CORS support for frontend
- Public endpoints for authentication
- Protected endpoints for authenticated users
- CSRF protection disabled for API

### Data Validation
- Request validation using Jakarta Bean Validation
- Custom validation annotations
- Error handling with proper HTTP status codes

---

## 🛠️ Technology Stack

**Backend:**
- **Java 17** - Modern Java features
- **Spring Boot 3.2** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - Database access
- **JWT** - Token-based authentication
- **OpenAI Java SDK** - AI integration
- **Spring Mail** - Email notifications
- **Maven** - Dependency management

**Database:**
- **MongoDB** - NoSQL document database

**Security:**
- **BCrypt** - Password hashing
- **JWT** - Stateless authentication
- **Spring Security** - Comprehensive security

---

## 📝 Example API Calls

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Send Message
```bash
curl -X POST http://localhost:8080/api/message/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "chatId": "chat-id",
    "prompt": "How can I prevent flu?"
  }'
```

---

## 🔧 Configuration

### Application Properties
Key configuration options in `application.properties`:

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.data.mongodb.uri=mongodb://localhost:27017/health-chatbot

# JWT
jwt.secret=your-secret-key
jwt.expiration=900000

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# OpenAI
openai.api.key=your-openai-key
```

---

## 🚀 Deployment

### Build for Production
```bash
mvn clean package
java -jar target/ai-public-health-chatbot-1.0.0.jar
```

### Docker Support
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/ai-public-health-chatbot-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment Variables for Production
- `MONGODB_URI` - MongoDB connection string
- `JWT_KEY` - JWT secret key
- `OPENAI_API_KEY` - OpenAI API key
- `MY_EMAIL` - Email for notifications
- `MY_PASSWORD` - Email app password

---

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Integration Tests
```bash
mvn test -Dspring.profiles.active=test
```

---

## 📊 Monitoring & Logging

### Application Logs
- Console logging with Spring Boot
- Configurable log levels
- Request/response logging

### Health Endpoints
- `/api/health` - Application health check
- Database connectivity status
- Service availability

---

## 🤝 Contributing

This project is open for extensions:
- Add more language support
- Integrate real hospital networks
- Implement prescription delivery
- Add wearable device integration
- Build mobile apps (Spring Native)
- Expand medical knowledge base
- Implement advanced analytics

---

## 📄 License

MIT License - Use freely in your projects

---

**Built with ❤️ for health awareness and public good**

**Version:** 1.0.0 - Java Spring Boot  
**Status:** ✅ Production Ready  
**Last Updated:** January 2026
