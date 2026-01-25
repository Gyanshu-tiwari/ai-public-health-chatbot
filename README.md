# 🤖 AI Public Health Chatbot

**A modern AI-powered health chatbot with enhanced user authentication, chat management, AI responses featuring PrismJS syntax highlighting, and ORS (Online Registration System) appointment booking.**

---

## 🚀 Features

### ✨ Core Features
- **AI-Powered Chat**: Intelligent health assistant powered by Google Gemini API
- **User Authentication**: Secure JWT-based registration and login system
- **Chat Management**: Create, manage, and delete chat conversations
- **Enhanced UI**: Modern React frontend with responsive design
- **Syntax Highlighting**: PrismJS integration for code blocks in AI responses
- **Real-time Responses**: Fast AI responses with proper error handling
- **Copy Code**: One-click code copying functionality
- **Rich Markdown**: Full markdown support with tables, lists, and formatting

### 🏥 ORS Appointment Booking
- **Phone Authentication**: Login with phone number and OTP (mimics ORS.gov.in)
- **Hospital Selection**: Choose from multiple government hospitals (AIIMS, Safdarjung, etc.)
- **Department Selection**: Browse medical departments and specialties
- **Doctor Booking**: Select doctors and view their qualifications
- **Time Slot Management**: Real-time availability checking and booking
- **Appointment History**: View, manage, and cancel appointments
- **Consultation Types**: Support for both online and offline consultations
- **Booking Confirmation**: Instant confirmation with reference numbers

### 🛡️ Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **API Security**: Protected endpoints with proper authorization
- **Phone Verification**: OTP-based authentication for appointments

### 🎨 UI/UX Features
- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works on all device sizes
- **Code Highlighting**: Beautiful syntax highlighting for code snippets
- **Message Formatting**: Rich markdown rendering with proper styling
- **Error Handling**: User-friendly error messages and notifications
- **Progress Indicators**: Step-by-step appointment booking process

---

## 📂 Project Structure

```
ai-public-health-chatbot/
├── frontend/                           React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── chatComponents/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── MessageItems.jsx    # Enhanced with PrismJS
│   │   │   │   └── ...
│   │   │   ├── ORSAppointmentBooking.jsx  # ORS appointment booking
│   │   │   ├── QuickAppointmentBooking.jsx  # Chat-integrated booking
│   │   │   └── AppointmentHistory.jsx   # Appointment management
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ORSAppointmentPage.jsx  # Full-page appointment booking
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── api.jsx              # Axios API client
│   │   └── App.jsx
│   └── package.json
├── backend/                            Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/healthchat/
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   ├── MessageController.java
│   │   │   │       │   ├── ChatController.java
│   │   │   │       │   ├── ORSController.java      # ORS appointment API
│   │   │   │       │   └── TestController.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── gemini/
│   │   │   │       │   │   └── GeminiService.java  # Enhanced AI service
│   │   │   │       │   ├── ORSService.java          # ORS business logic
│   │   │   │       │   ├── AuthService.java
│   │   │   │       │   ├── MessageService.java
│   │   │   │       │   └── UserService.java
│   │   │   │       ├── config/
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   └── JwtAuthenticationFilter.java
│   │   │   │       ├── dto/
│   │   │   │       │   ├── RegisterRequest.java
│   │   │   │       │   ├── LoginRequest.java
│   │   │   │       │   ├── ORSLoginRequest.java   # ORS authentication
│   │   │   │       │   └── ORSAppointmentRequest.java  # Appointment booking
│   │   │   │       └── model/
│   │   │   │           ├── Chat.java
│   │   │   │           ├── User.java
│   │   │   │           ├── Hospital.java          # ORS hospital model
│   │   │   │           ├── Department.java       # ORS department model
│   │   │   │           ├── Doctor.java           # ORS doctor model
│   │   │   │           └── ORSAppointment.java   # ORS appointment model
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom-simple.xml
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start

### Prerequisites
- **Java 17+** - Backend development
- **Node.js 16+** - Frontend development
- **MongoDB** - Database
- **Google Gemini API Key** - AI service

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-public-health-chatbot
```

### 2. Backend Setup
```bash
cd backend

# Set environment variables (Windows PowerShell)
$env:GEMINI_API_KEY="your-gemini-api-key"
$env:MY_EMAIL="your-email@gmail.com"
$env:MY_PASSWORD="your-app-password"
$env:JWT_KEY="your-jwt-secret-key"

# Or create .env file
echo "GEMINI_API_KEY=your-gemini-api-key" > .env
echo "MY_EMAIL=your-email@gmail.com" >> .env
echo "MY_PASSWORD=your-app-password" >> .env
echo "JWT_KEY=your-jwt-secret-key" >> .env

# Install dependencies and run
mvn clean install -f pom-simple.xml -DskipTests
mvn spring-boot:run -f pom-simple.xml
```

**Backend runs on:** `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### 4. Initialize ORS Data
```bash
# Initialize sample hospitals and doctors
curl -X POST http://localhost:8080/api/ors/initialize-data
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get user info |
| POST | `/api/auth/logout` | User logout |

### Chat & Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/message/text` | Send message to AI |
| GET | `/api/chat/create` | Create new chat |
| GET | `/api/chat/get` | Get user chats |
| POST | `/api/chat/delete` | Delete chat |

### ORS Appointment Booking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ors/send-otp` | Send OTP to phone number |
| POST | `/api/ors/verify-otp` | Verify OTP and authenticate |
| GET | `/api/ors/hospitals` | Get all hospitals |
| GET | `/api/ors/hospitals/{id}` | Get hospital by ID |
| GET | `/api/ors/hospitals/{id}/departments` | Get hospital departments |
| GET | `/api/ors/hospitals/{id}/departments/{id}/doctors` | Get department doctors |
| GET | `/api/ors/doctors/{id}/time-slots` | Get available time slots |
| POST | `/api/ors/appointments` | Book appointment |
| GET | `/api/ors/appointments/phone/{phone}` | Get user appointments |
| GET | `/api/ors/appointments/{id}` | Get appointment by ID |
| PUT | `/api/ors/appointments/{id}/cancel` | Cancel appointment |
| POST | `/api/ors/initialize-data` | Initialize sample data |

### Testing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/test/gemini` | Test AI service |

---

## 📝 Example API Calls

### Chat Endpoint
```bash
curl -X POST http://localhost:8080/api/message/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"prompt":"How can I prevent flu?","chatId":"chat-id"}'
```

### ORS Appointment Booking
```bash
# Send OTP
curl -X POST "http://localhost:8080/api/ors/send-otp?phoneNumber=9876543210"

# Verify OTP
curl -X POST http://localhost:8080/api/ors/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"9876543210","otp":"123456"}'

# Get Hospitals
curl -X GET http://localhost:8080/api/ors/hospitals

# Book Appointment
curl -X POST http://localhost:8080/api/ors/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "hospitalId":"hospital-id",
    "departmentId":"department-id", 
    "doctorId":"doctor-id",
    "patientName":"John Doe",
    "phoneNumber":"9876543210",
    "age":"30",
    "gender":"Male",
    "appointmentDate":"2026-01-25T00:00:00",
    "timeSlot":"09:00 AM - 09:30 AM"
  }'
```

### User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

---

## 🔐 Safety & Compliance

### What the System DOES ✅
- Provide health awareness and education
- Suggest prevention and lifestyle tips
- Recommend professional medical consultation
- Detect and refer emergency symptoms
- Maintain patient privacy
- Handle medical data securely

### What the System DOESN'T DO ❌
- Diagnose diseases
- Prescribe medications
- Provide medical treatment
- Make definitive health claims
- Replace professional doctors
- Guarantee outcomes

### Emergency Protocol
**Critical symptoms automatically trigger:**
- ⚠️ EMERGENCY WARNING display
- Recommendation to call emergency (911/100)
- Immediate escalation to healthcare provider
- No AI diagnosis for emergencies

### Data Security
- HIPAA-compliant framework
- Encrypted medical records
- Secure telemedicine connections
- User consent requirements
- No unauthorized data sharing

---

## 🤖 AI Configuration

**Default Model:** `gpt-3.5-turbo` (cost-efficient)  
**Alternative:** `gpt-4` (better quality, higher cost)

**Settings:**
- Temperature: 0.7 (balanced responses)
- Max Tokens: 500 (reasonable length)
- Top P: 0.9 (diversity)

**Switch to Azure OpenAI:**
1. Update `.env`:
   ```env
   AZURE_OPENAI_KEY=your_key
   AZURE_OPENAI_ENDPOINT=your_endpoint
   ```
2. Uncomment Azure code in `backend/src/services/aiService.js`

---

## 🌐 Bilingual Support

### English & Hindi Support
```json
{
  "message": "मुझे बुखार है",
  "language": "hi"
}
```

### Add More Languages
Edit `backend/src/services/aiService.js` system prompts:
```javascript
const systemPrompt = language === 'hi' ? 
  'Hindi system prompt here...' :
  'English system prompt here...';
```

---

## 📊 Technology Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 7.3.1** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **PrismJS** - Syntax highlighting library
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **React Router** - Client-side routing

### Backend
- **Spring Boot 3.2.0** - Java framework
- **MongoDB** - NoSQL database
- **JWT (jjwt)** - Authentication tokens
- **Spring Security** - Security framework
- **Maven** - Build and dependency management
- **Jackson** - JSON processing
- **BCrypt** - Password encryption

### Integration
- **Google Gemini API** - AI service
- **RESTful API** - Backend API design
- **CORS** - Cross-origin resource sharing
- **JWT Authentication** - Secure stateless auth
- **Phone OTP** - ORS-style authentication

---

##  Prerequisites

- **Java 17+** - [Download](https://adoptium.net/)
- **Node.js 16+** - [Download](https://nodejs.org)
- **MongoDB** - [Download](https://www.mongodb.com/try)
- **Google Gemini API Key** - [Get key](https://aistudio.google.com/app/apikey)

---

## 🚀 Deployment

### Deployment Checklist
- [ ] All API keys configured in production `.env`
- [ ] HTTPS/SSL enabled
- [ ] Rate limiting configured
- [ ] Database connection tested
- [ ] Logging and monitoring set up
- [ ] Error handling verified
- [ ] CORS properly configured
- [ ] Frontend/backend URLs updated

### Deploy to Production

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
heroku config:set OPENAI_API_KEY=sk-...
heroku open
```

**Railway (Recommended):**
```bash
railway login
railway deploy
railway link  # Connect to GitHub
```

**AWS/Azure/Google Cloud:**
- Deploy Node.js backend to App Service/Cloud Run
- Deploy React frontend to S3/Cloud Storage
- Configure CDN for frontend
- Set up database in managed service

---

## 🧪 Testing

### Backend Tests
```bash
# Start server
npm run dev

# Health check
curl http://localhost:3001/api/chat/health

# Chat test
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hi","language":"en"}'
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 3001 in use | Change PORT in .env or kill process on port |
| OpenAI API error | Check OPENAI_API_KEY in .env |
| CORS error | Verify FRONTEND_URL in .env |
| Module not found | Run `npm install` in backend/ |
| Cannot connect to DB | Check DATABASE_URL in .env |

---

## 📚 File Locations

| File | Purpose |
|------|---------|
| `backend/src/app.js` | Main server and route setup |
| `backend/src/services/aiService.js` | OpenAI integration |
| `backend/src/data/diseases.json` | Medical database |
| `ai-prompts/systemPrompt.txt` | AI system instructions |
| `ai-prompts/safetyRules.txt` | Safety guardrails |

---

## 🎯 Advanced Usage

### Custom AI Behavior
Edit `backend/src/services/aiService.js`:
```javascript
const systemPrompt = `You are a health awareness assistant...`;
```

### Add Emergency Keywords
Modify `backend/src/services/symptomService.js`:
```javascript
const emergencyKeywords = ['chest pain', 'difficulty breathing', ...];
```

### Database Integration
Uncomment MongoDB code in `backend/src/controllers/recordsController.js`

### Email Notifications
Configure SendGrid in `.env` and enable in `backend/src/services/appointmentService.js`

---

## ❓ FAQ

**Q: Is this a medical diagnosis tool?**  
A: No. It provides health awareness only. Users must consult doctors for diagnosis.

**Q: Can I add real doctor integrations?**  
A: Yes. Configure your doctor network API in telemedicineService.js

**Q: How much does it cost to run?**  
A: ~$0.002 per chat. Costs vary by feature usage.

**Q: Can I use this in production?**  
A: Yes, with proper compliance, security, and legal review.

**Q: Can I customize the AI responses?**  
A: Yes, edit system prompts in aiService.js

**Q: Is it HIPAA compliant?**  
A: Framework supports HIPAA. Enable encryption, access controls, and auditing.

**Q: How do I add support for more languages?**  
A: Add language option and system prompts in aiService.js

**Q: Can I store chat history?**  
A: Yes, enable MongoDB and logging in chatController.js

---

## 📞 Support & Resources

### Documentation
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Twilio Docs](https://www.twilio.com/docs)

### Monitoring
- Check server logs for errors: `npm run dev`
- Monitor API response times
- Track OpenAI usage and costs
- Review application error logs

---

## 🤝 Contributing

This project is open for extensions:
- Add more language support
- Integrate real hospital networks
- Implement prescription delivery
- Add wearable device integration
- Build mobile apps (React Native/Flutter)
- Expand medical knowledge base
- Implement advanced analytics

---

## 📄 License

MIT License - Use freely in your projects

---

## 🎓 Architecture

```
┌─────────────────────────────────┐
│      React Frontend (5173)      │
│   - Chat Interface              │
│   - Language Switcher           │
│   - Record Management           │
│   - Appointment Booking         │
└──────────────┬──────────────────┘
               │ (HTTP/REST)
┌──────────────▼──────────────────┐
│   Express Backend (3001)        │
│  ┌───────────────────────────┐  │
│  │  API Routes (7 modules)   │  │
│  │  - Chat, Symptoms, etc    │  │
│  ├───────────────────────────┤  │
│  │  Controllers (7 files)    │  │
│  │  - Request handling       │  │
│  ├───────────────────────────┤  │
│  │  Services (7 files)       │  │
│  │  - Business logic         │  │
│  ├───────────────────────────┤  │
│  │  OpenAI Integration       │  │
│  │  - AI chat responses      │  │
│  └───────────────────────────┘  │
└──────────────┬──────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
  OpenAI    MongoDB     Twilio
  (Chat)   (Records)  (Video)
```

---

## ✨ Key Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| AI Chat | ✅ Complete | OpenAI-powered with safety guardrails |
| Bilingual | ✅ Complete | English & Hindi support |
| Symptom Checker | ✅ Complete | AI analysis with doctor referral |
| Telemedicine | ✅ Complete | Video consultation framework |
| Appointments | ✅ Complete | Full booking and management |
| Medical Database | ✅ Complete | Conditions, medications, treatments |
| Health Records | ✅ Complete | Secure storage and retrieval |
| Insurance | ✅ Complete | Claim processing framework |
| Emergency Detection | ✅ Complete | Automatic critical symptom detection |
| Safety Rules | ✅ Complete | Strict compliance guidelines |

---

## 📈 Performance & Monitoring

### Optimization Features
- **Connection Pooling**: Database connection optimization
- **Response Caching**: API response caching where appropriate
- **Error Handling**: Comprehensive error management
- **Input Validation**: Prevents invalid requests
- **Rate Limiting**: Protection against API abuse

### Monitoring Recommendations
- **Application Logs**: Track errors and performance
- **API Response Times**: Monitor AI service latency
- **Database Performance**: Query optimization indexes
- **User Metrics**: Track usage patterns

---

## 🔒 Security Considerations

### Implemented Security Measures
- **Input Validation**: All user inputs validated
- **Password Encryption**: BCrypt hashing for stored passwords
- **JWT Security**: Time-limited tokens with secure signing
- **CORS Configuration**: Controlled cross-origin access
- **API Key Protection**: Environment variable storage
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization and output encoding

### Security Best Practices
- **Never commit API keys** to version control
- **Use environment variables** for sensitive configuration
- **Regular security updates** for all dependencies
- **HTTPS in production** for all communications
- **Regular security audits** and penetration testing

---

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create feature branch** from main
3. **Make changes** following existing code patterns
4. **Test thoroughly** before submitting
5. **Submit pull request** with clear description

### Code Standards
- **Java**: Follow Spring Boot conventions
- **React**: Use functional components and hooks
- **Comments**: Add clear documentation for complex logic
- **Testing**: Include unit tests for new features
- **Security**: Never expose sensitive data

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

### Getting Help
- **Documentation**: Check this README and code comments
- **Issues**: Report bugs via GitHub Issues
- **Features**: Request features via GitHub Discussions
- **Security**: Report security concerns privately

### Contact Information
- **Project Repository**: [GitHub Repository Link]
- **Documentation**: [Wiki/Docs Link]
- **Issues**: [Issues Page Link]

---

## 🎯 Roadmap

### Upcoming Features
- **Multi-language Support**: Extended language capabilities
- **File Upload**: Document and image sharing in chats
- **Voice Input**: Speech-to-text integration
- **Mobile Apps**: React Native and Flutter applications
- **Advanced Analytics**: User behavior insights
- **API Rate Limiting**: Enhanced abuse prevention
- **Database Optimization**: Improved query performance

---

## 🏆 Current Status

**Version**: 1.1.0 - ORS Appointment Booking Integration  
**Last Updated**: January 25, 2026  
**Status**: ✅ Production Ready

### ✅ Working Features
- **User Authentication**: Registration and login fully functional
- **AI Chat Service**: Gemini API integration with syntax highlighting
- **ORS Appointment Booking**: Complete hospital appointment system
  - Phone number authentication with OTP
  - Hospital/Department/Doctor selection
  - Time slot booking and management
  - Appointment history and cancellation
- **CORS Configuration**: Properly configured for cross-origin requests
- **Database Integration**: MongoDB with chat and appointment persistence
- **Security**: JWT authentication with proper validation
- **Enhanced UI**: Modern React interface with PrismJS highlighting

### 🆕 New in v1.1.0
- **ORS Integration**: Complete ORS.gov.in-style appointment booking
- **Phone Authentication**: OTP-based login system
- **Hospital Management**: Multiple hospitals with departments and doctors
- **Appointment Management**: Book, view, and cancel appointments
- **Chat Integration**: Quick appointment booking from chat interface
- **Sample Data**: Pre-configured hospitals (AIIMS, Safdarjung) and doctors

### 🚀 Quick Start Summary
1. **Get Gemini API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Set Environment**: Configure `GEMINI_API_KEY` environment variable
3. **Start Backend**: `mvn spring-boot:run -f pom-simple.xml`
4. **Start Frontend**: `npm run dev`
5. **Initialize ORS Data**: `curl -X POST http://localhost:8080/api/ors/initialize-data`
6. **Access Application**: 
   - Chat: `http://localhost:5173`
   - Appointments: `http://localhost:5173/book-appointment`
7. **Register & Chat**: Create account and start chatting!
8. **Book Appointments**: Use phone number to book hospital appointments

**🎉 Your AI health chatbot with ORS appointment booking is ready to use!**
