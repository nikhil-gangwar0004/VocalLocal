<div align="center">

# 🟡 VocalLocal

### *Pilibhit's Digital Service Hub*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-vocal--local.vercel.app-FFB800?style=for-the-badge)](https://vocal-local.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

<br/>

> 🏙️ **Connecting local service providers with customers in Pilibhit, Uttar Pradesh.**
> Find plumbers, electricians, tutors, and more — all in one place.

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🧭 About the Project

**VocalLocal** is a hyperlocal service marketplace built specifically for **Pilibhit, Uttar Pradesh**.

It bridges the gap between skilled local workers and people who need their services — digitizing a process that was previously only word-of-mouth. Whether you need a plumber at 10 PM or a home tutor for your kids, VocalLocal connects you instantly.

```
Problem    →   People can't find local service providers easily
Solution   →   VocalLocal — one platform for all local services
Target     →   Pilibhit, Uttar Pradesh (Hyperlocal)
```

---

## 🌐 Live Demo

> 🚀 Click below to see it live!

[![Visit VocalLocal](https://img.shields.io/badge/Visit-vocal--local.vercel.app-FFB800?style=for-the-badge&logo=vercel)](https://vocal-local.vercel.app)

---

## ✨ Features

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | 🔍 **Service Search** | Search providers by category or name | ✅ Live |
| 2 | 📍 **Local Listings** | Browse verified local service providers | ✅ Live |
| 3 | 📱 **Responsive Design** | Works on mobile, tablet & desktop | ✅ Live |
| 4 | 🌙 **Dark UI** | Eye-friendly dark theme throughout | ✅ Live |
| 5 | ✨ **Smooth Animations** | Framer Motion powered transitions | ✅ Live |
| 6 | 🔐 **User Auth** | Register & login (provider / customer) | 🔄 In Progress |
| 7 | ⭐ **Ratings & Reviews** | Rate service providers after work | 🔄 In Progress |
| 8 | 💬 **Direct Contact** | Call or WhatsApp providers directly | 🔄 In Progress |
| 9 | 📦 **Booking System** | Book appointments online | 🗓️ Planned |
| 10 | 📊 **Provider Dashboard** | Manage services & bookings | 🗓️ Planned |

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| ⚛️ **React** | UI Framework | 18.x |
| 🎨 **Tailwind CSS** | Utility-first Styling | 3.x |
| 🎬 **Framer Motion** | Animations & Transitions | Latest |
| 🔷 **Lucide React** | Icon Library | Latest |
| 🔀 **React Router DOM** | Client-side Routing | v6 |

### 🔧 Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| 🟢 **Node.js** | JavaScript Runtime | 18.x |
| 🚂 **Express.js** | REST API Framework | 4.x |
| 🍃 **MongoDB** | NoSQL Database | Latest |
| 🦡 **Mongoose** | MongoDB ODM | Latest |
| 🔑 **JWT** | Authentication Tokens | Latest |
| 🔒 **bcryptjs** | Password Hashing | Latest |

### ☁️ DevOps & Deployment

| Service | Purpose |
|---------|---------|
| ▲ **Vercel** | Frontend Hosting |
| 🟣 **Render** | Backend Hosting |
| 🐙 **GitHub** | Version Control & CI/CD |
| 🍃 **MongoDB Atlas** | Cloud Database |

---

## 🚀 Getting Started

### ✅ Prerequisites

```bash
node  >= 18.0.0
npm   >= 9.0.0
git   (any recent version)
```

### 📥 Installation

**Step 1 — Clone the repository**
```bash
git clone https://github.com/nikhil-gangwar0004/VocalLocal.git
cd VocalLocal
```

**Step 2 — Install Frontend dependencies**
```bash
cd client
npm install
```

**Step 3 — Install Backend dependencies**
```bash
cd ../server
npm install
```

**Step 4 — Setup Environment Variables**

> See [Environment Variables](#-environment-variables) section below 👇

**Step 5 — Run the project**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

**Step 6 — Open in Browser**
```
http://localhost:3000
```

---

## 🌿 Environment Variables

Create `.env` files as shown below:

**`/server/.env`**
```env
MONGO_URI       = your_mongodb_atlas_connection_string
PORT            = 5000
JWT_SECRET      = your_super_secret_jwt_key
NODE_ENV        = development
```

**`/client/.env`**
```env
REACT_APP_API_BASE_URL = http://localhost:5000/api
```

> ⚠️ Never commit `.env` files to GitHub. They are already in `.gitignore`.

---

## 📁 Project Structure

```
VocalLocal/
│
├── 📁 client/                     # React Frontend
│   ├── 📁 public/
│   └── 📁 src/
│       ├── 📁 components/         # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── ServiceCard.jsx
│       ├── 📁 pages/              # Route-level pages
│       │   ├── Home.jsx
│       │   ├── Services.jsx
│       │   └── Contact.jsx
│       ├── 📁 hooks/              # Custom React hooks
│       ├── 📁 utils/              # Helper functions
│       ├── App.jsx
│       └── index.js
│
├── 📁 server/                     # Node.js + Express Backend
│   ├── 📁 controllers/            # Route logic
│   ├── 📁 models/                 # Mongoose schemas
│   ├── 📁 routes/                 # API route definitions
│   ├── 📁 middleware/             # Auth & error handling
│   ├── 📁 config/                 # DB connection config
│   └── index.js                   # Server entry point
│
└── README.md
```

---

## 📜 Available Scripts

In the `/client` directory:

| Command | Description |
|---------|-------------|
| `npm start` | Run app in development mode at `localhost:3000` |
| `npm run build` | Build for production in `/build` folder |
| `npm test` | Launch test runner in interactive mode |

In the `/server` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with nodemon (auto-reload) |
| `npm start` | Start backend in production mode |

---

## 🗺️ Roadmap

```
Phase 1 — Foundation          ✅ Complete
├── Project setup
├── UI/UX Design (Dark Theme)
├── Service listings
└── Deployment (Vercel + Render)

Phase 2 — Core Features       🔄 In Progress
├── User Authentication (JWT)
├── Provider Registration
├── Search & Filter
└── Reviews & Ratings

Phase 3 — Advanced            🗓️ Planned
├── WhatsApp Integration
├── Booking System
├── Admin Dashboard
└── Payment Gateway

Phase 4 — Mobile              🔮 Future
└── React Native App
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

```bash
# 1. Fork this repository

# 2. Create your feature branch
git checkout -b feature/YourAmazingFeature

# 3. Commit your changes
git commit -m "feat: add YourAmazingFeature"

# 4. Push to the branch
git push origin feature/YourAmazingFeature

# 5. Open a Pull Request 🎉
```

---

## 👨‍💻 Author

<div align="center">

### Nikhil Gangwar

*Final Year B.Tech CSE Student | MERN Stack Developer*
📍 Pilibhit, Uttar Pradesh, India

[![GitHub](https://img.shields.io/badge/GitHub-nikhil--gangwar0004-181717?style=for-the-badge&logo=github)](https://github.com/nikhil-gangwar0004)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com)

</div>

---

<div align="center">

Made with ❤️ for Pilibhit &nbsp;•&nbsp; © 2025 VocalLocal



</div>
