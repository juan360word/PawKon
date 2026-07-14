# 🐾 PawKon

A complete full-stack veterinary clinic platform built with the **MERN stack** and **TypeScript**. PawKon lets users schedule veterinary appointments and adopt dogs, while doctors manage everything from a dedicated dashboard — all secured with JWT authentication and role-based access control.

![Status](https://img.shields.io/badge/status-completed-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

##  Features

### 🌐 Public
- **Animated landing page** — letter-by-letter hero animation, scroll-triggered reveals, horizontal scroll gallery, and pinned sections powered by GSAP + ScrollTrigger + Lenis smooth scroll
- **Adoption explorer** — browse dog breeds with real data from The Dog API, with live search
- **Bilingual** — full English/Spanish support with a custom animated language switch (react-i18next)
- **Fully responsive** — mobile-first design with animated hamburger menu

### 👤 Users
- Register / Login with JWT authentication
- Book veterinary appointments and manage them (create / delete)
- Request dog adoptions with a personal message
- **Live adoption tracking** — only 20 dogs are available at a time; when one gets adopted it leaves the list and a new one joins with a "NEW" badge
- **Real-time status notifications** — toast alerts when the doctor approves or rejects a request (TanStack Query polling)
- View the doctor's personal message on each adoption decision

### 👨‍⚕️ Doctors
- **Separate registration with secret code** — prevents unauthorized doctor accounts
- **Dedicated login** that validates the doctor role
- **Dashboard with live stats** — total/pending appointments, pending/approved adoptions
- Manage appointments through a status workflow: `pending → confirmed → completed`
- Review adoption requests with an optional personal message before approving/rejecting
- Delete appointments and adoption requests

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| **React + Vite** | UI library & build tool |
| **TypeScript** | Type safety across the app |
| **Tailwind CSS** | Styling |
| **TanStack Query** | Data fetching, caching & mutations |
| **Zustand** (+ persist) | Global auth state with localStorage hydration |
| **React Router v7** | Routing with protected & role-based routes |
| **React Hook Form + Valibot** | Forms & schema validation |
| **GSAP + ScrollTrigger** | Scroll animations & pinned sections |
| **Lenis** | Smooth scrolling |
| **Framer Motion** | Component animations & modals |
| **react-i18next** | Internationalization (EN/ES) |
| **Axios** | HTTP client with JWT interceptor |
| **Lucide React** | Icons |

### Backend
| Tech | Purpose |
|------|---------|
| **Node.js + Express** | REST API |
| **TypeScript** | Type safety |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Stateless authentication |
| **bcrypt** | Password hashing (pre-save hooks) |
| **express-validator** | Request validation |
| **CORS** | Cross-origin configuration |

### Testing
| Tech | Purpose |
|------|---------|
| **Jest + ts-jest** | Test runner |
| **Supertest** | HTTP integration testing |
| **mongodb-memory-server** | In-memory MongoDB for isolated tests |

### External Services
- **[The Dog API](https://www.thedogapi.com/)** — breed data & images (proxied through the backend to protect the API key)

### Deployment AWS
**AWS EC2** | Backend hosting (Node.js API with PM2 process manager) |
| **AWS S3** | Frontend static hosting (Vite production build) |
| **AWS CloudFront** | CDN with global distribution & HTTPS |
| **AWS Elastic IP** | Static IP for the backend instance |
| **MongoDB Atlas** | Managed database (running on AWS infrastructure) |

### Production Architecture

User → CloudFront (CDN + HTTPS) → S3 (React build)
             ↓ API calls
      EC2 + PM2 (Express API) → MongoDB Atlas
             ↓
       The Dog API

## 📁 Project Structure

```
PawKon/
├── Frontend/
│   └── src/
│       ├── api/              # Axios instance + API functions per resource
│       ├── components/       # UI components (layout, adoption, ui)
│       ├── data/             # Static data (landing page content)
│       ├── hooks/            # TanStack Query hooks (useAuth, useBreeds, ...)
│       ├── locales/          # i18n translations (en.json, es.json)
│       ├── pages/            # Route pages + layouts
│       ├── router/           # Routes + ProtectedRoute + DoctorRoute
│       ├── store/            # Zustand auth store (persisted)
│       ├── Types/            # TypeScript types + Valibot schemas
│       └── i18n.ts           # i18next configuration
│
└── Backend/
    └── src/
        ├── config/           # MongoDB connection
        ├── Controllers/      # Business logic (Auth, Appointments, Adoption, Dogs)
        ├── Models/           # Mongoose schemas (User, Appointment, Adoption)
        ├── Routes/           # API endpoints + middleware
        │   └── Middleware/   # JWT protect, role check, validation errors
        ├── services/         # The Dog API proxy
        ├── utils/            # JWT token generator
        └── __tests__/        # Jest + Supertest integration tests
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/Auth/Register` | Register a new user | Public |
| POST | `/api/Auth/RegisterDoctor` | Register a doctor (requires secret code) | Public + code |
| POST | `/api/Auth/Login` | Login (users & doctors) | Public |

### Appointments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/Appointments/Create` | Book an appointment | 🔒 User |
| GET | `/api/Appointments/Myappointment` | Get my appointments | 🔒 User |
| GET | `/api/Appointments/Allcitas` | Get all appointments | 🔒 Doctor |
| PATCH | `/api/Appointments/:id/status` | Update status (confirm/complete) | 🔒 Doctor |
| DELETE | `/api/Appointments/:id` | Delete own appointment | 🔒 User |
| DELETE | `/api/Appointments/doctor/:id` | Delete any appointment | 🔒 Doctor |

### Adoptions
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/Adoptions/Create` | Submit adoption request | 🔒 User |
| GET | `/api/Adoptions/MyAdoptions` | Get my requests | 🔒 User |
| GET | `/api/Adoptions/Alladopciones` | Get all requests | 🔒 Doctor |
| GET | `/api/Adoptions/AdoptedBreeds` | Get approved breed names | Public |
| PATCH | `/api/Adoptions/:id/status` | Approve/reject with optional message | 🔒 Doctor |
| DELETE | `/api/Adoptions/:id` | Delete a request | 🔒 Doctor |

### Dogs (The Dog API proxy)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/Dogs/breeds` | All breeds | Public |
| GET | `/api/Dogs/breeds/:id` | Breed detail | Public |
| GET | `/api/Dogs/breeds/:id/images` | Breed images | Public |

---

##  Authentication & Roles

- **JWT tokens** signed with a server secret, sent via `Authorization: Bearer <token>`
- **Passwords hashed** with bcrypt using Mongoose pre-save hooks — never stored or returned in plain text
- **Two roles** with dedicated middleware:

| Role | Capabilities |
|------|-------------|
| `User` | Book/delete own appointments, request adoptions, track request status |
| `Doctor` | Everything + manage all appointments & adoptions, approve/reject with messages |

- **Doctor registration is gated** behind a secret code stored in environment variables
- **Route protection on both ends** — Express middleware (`protect`, `IsDoctor`) on the API and React route guards (`ProtectedRoute`, `DoctorRoute`) with Zustand hydration handling

---

##  Tests

Integration tests with an in-memory MongoDB (no real database touched):

- **Auth** — successful registration, duplicate email rejection, login validation
- **Middleware** — requests without token (401), invalid token (401), valid token, wrong role (403)
- **Appointments** — creation, listing own appointments, missing fields, auth checks
- **Adoptions** — creation, listing, doctor-only route protection

```bash
cd Backend
npm test
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local) or MongoDB Atlas
- [The Dog API key](https://www.thedogapi.com/) (free)

### Backend

```bash
cd Backend
npm install
```

Create `.env`:

```env
MONGO_HOST=mongodb://localhost:27017/pawkon
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
DOG_API_KEY=your_dog_api_key
DOCTOR_SECRET_CODE=your_doctor_code
FRONTEND_URL=http://localhost:5173
PORT=3560
```

```bash
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:3560/api
```

```bash
npm run dev
```

---

## 🎨 Design

Custom dark theme built around:

| Token | Color |
|-------|-------|
| Background | `#051d1b` |
| Surface | `#151212` |
| Text | `#fffef0` |
| Primary | `#72cf2a` |

Animations include a letter-drop hero with 3D rotation, clip-path text reveals, horizontal scroll galleries, pinned scroll sections with blur transitions, and spring-based modals.

---

##  What I Learned

This is my second full-stack project, built from scratch to practice:

- Designing a REST API with a clean MVC architecture in TypeScript
- Stateless auth with JWT + refresh-safe state hydration on the client
- Role-based access control across backend middleware and frontend route guards
- Server state management with TanStack Query (caching, invalidation, polling)
- Integration testing with isolated in-memory databases
- Advanced scroll animation techniques with GSAP and ScrollTrigger
- Internationalization patterns with react-i18next
- Proxying third-party APIs to protect credentials

---

## 👤 Author

**juan360dev**
[GitHub](https://github.com/juan360dev)

---

