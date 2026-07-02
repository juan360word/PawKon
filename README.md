# 🐾 PawKon

A full-stack veterinary clinic platform built with the **MERN stack** and TypeScript on the backend. PawKon allows users to schedule veterinary appointments, explore dog breeds for adoption, and submit adoption requests — all managed through a secure role-based system.

---

## 🚀 Features

- 🏥 Veterinary clinic information and services page
- 🐶 Dog breed explorer powered by [The Dog API](https://www.thedogapi.com/)
- 📋 Appointment scheduling system for pet checkups and exams
- 🐕 Adoption request system with breed selection
- 👨‍⚕️ Doctor dashboard to manage appointments and adoption requests
- 🔐 JWT authentication with role-based access control (User / Doctor)
- 🔒 Password hashing with bcrypt
- ✅ Integration tests with Jest + Supertest

---

## 🛠️ Tech Stack

### Frontend *(in progress)*
- React 
- Vite
- Tailwind CSS
- TanStack Query (useQuery / useMutation)
- React Router

### Backend *(completed fase 1)*
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- Jest + Supertest

### External API
- [The Dog API](https://www.thedogapi.com/) — breed information and images

### Deployment *(planned)*
- AWS (EC2 / Elastic Beanstalk + S3)
- MongoDB Atlas

---

## 📁 Project Structure

```
PawKon/
├── frontend/          # React + Vite + Tailwind (in progress)
└── backend/           # Node.js + Express + TypeScript
    └── src/
        ├── config/        # MongoDB connection
        ├── controllers/   # Business logic
        ├── middleware/     # JWT protect + role check
        ├── models/        # Mongoose schemas (User, Appointment, AdoptionRequest)
        ├── routes/        # API endpoints
        ├── services/      # The Dog API proxy
        ├── utils/         # JWT token generator
        └── __tests__/     # Jest + Supertest integration tests
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/Auth/Register` | Register a new user | ❌ |
| POST | `/api/Auth/Login` | Login and get JWT token | ❌ |

### Appointments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/Appointments/Create` | Create a new appointment | ✅ User |
| GET | `/api/Appointments/Myappointment` | Get my appointments | ✅ User |
| GET | `/api/Appointments/Allcitas` | Get all appointments | ✅ Doctor |

### Adoptions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/Adoptions/Create` | Submit adoption request | ✅ User |
| GET | `/api/Adoptions/MyAdoptions` | Get my adoption requests | ✅ User |
| GET | `/api/Adoptions/Alladopciones` | Get all adoption requests | ✅ Doctor |
| PATCH | `/api/Adoptions/:id/status` | Update adoption status | ✅ Doctor |

### Dogs (The Dog API Proxy)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dogs/breeds` | Get all breeds | ✅ User |
| GET | `/api/dogs/breeds/:id` | Get breed by ID | ✅ User |
| GET | `/api/dogs/breeds/:id/images` | Get breed images | ✅ User |

---

## 🔐 Roles

| Role | Access |
|------|--------|
| `User` | Register, login, create appointments, submit adoption requests, view own data, browse breeds |
| `Doctor` | Everything above + view all appointments and adoption requests, update adoption status |

> New users are assigned the `User` role by default. The `Doctor` role is assigned manually.

---

## ✅ Tests

Integration tests cover:

- **Auth** — register, duplicate email, invalid credentials
- **Middleware** — protect (no token, invalid token, valid token), IsDoctor (role check)
- **Appointments** — create, view own, missing fields, unauthorized access
- **Adoptions** — create, view own, unauthorized access (403 for non-doctors)

Run tests:
```bash
cd backend
npm test
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local) or MongoDB Atlas
- The Dog API key → [Get one here](https://www.thedogapi.com/)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_HOST=mongodb://localhost:27017/pawkon
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
DOG_API_KEY=your_dog_api_key_here
PORT=3560
```

Run in development:
```bash
npm run dev
```

---

## 📌 Status

🚧 **In development** — Backend complete. Frontend in progress.

This is a personal learning project built from scratch to practice full-stack architecture, JWT authentication, role-based access control, external API integration, and integration testing.

---

## 👤 Author

**juan360dev**  
[GitHub](https://github.com/juan360dev)
