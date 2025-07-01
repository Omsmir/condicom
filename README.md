# 🏥 Hospital Management System (HMS)

A production-grade, modular **Hospital Management System** designed for scalability, real-time operations, and 3D medical visualization. Powered by **Next.js**, **Express.js**, **MongoDB**, **Redis**, and **Three.js**, this system serves hospitals, clinics, and educational institutions with a full-stack, real-time architecture.

---

## ⚙️ Tech Stack Overview

| Layer        | Technology                                  |
|--------------|----------------------------------------------|
| Frontend     | Next.js, TypeScript, TailwindCSS, ShadCN     |
| State Mgmt   | TanStack Query, TanStack Table               |
| Backend      | Express.js (TypeScript), Zod, Config         |
| Database     | MongoDB (Deep schema for anatomical data)    |
| Realtime     | Redis Pub/Sub, Socket.IO                     |
| Auth         | JWT (access/refresh), NextAuth               |
| 3D Graphics  | Three.js, Blender                            |
| Monitoring   | Prometheus (custom metrics & dashboards)     |
| Deployment   | Docker, Kubernetes-ready, Makefile-based     |

---

## 📦 Features at a Glance

### 🔐 Auth & Access Control
- JWT with auto-refresh logic via middleware
- Role-based access per route
- NextAuth for session-based frontend auth

### 🧩 Modular Architecture
- Microservices for users, appointments, pharmacy, etc.
- Centralized service startup using `server.ts`
- Multi-tenant hospital instances

### 🧑‍⚕️ Core Modules
- Patient & staff management
- Doctor dashboard with live appointments
- Prescription & medical history tracking

### ⚡ Real-Time System
- Redis Pub/Sub + Socket.IO
- Live notifications for appointments and emergencies

### 🦷 3D Medical Viewer
- Interactive oral cavity model with individual tooth layers
- Tracks conditions like decay or restorations

### 📊 Admin & Metrics Dashboard
- API performance: error/success rate, latency
- Charts built with Recharts (Prometheus-fed)

### ✅ Validation & Errors
- Full Zod validation (backend + frontend)
- Unified error response handler

---

## 🚀 Getting Started

### 🐳 Docker-Based Deployment

This project uses a `Makefile` to orchestrate Docker-based deployments for the frontend, backend, MongoDB, Redis, and more.

#### Step-by-step:

```bash
# Clone the repository
git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system

# Start all services using Docker Compose
make up

# Tear down all services
make down
