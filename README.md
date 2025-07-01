# 🏥 Hospital Management System (HMS)

A production-grade, modular **Hospital Management System** designed for scalability, real-time operations, and 3D medical visualization. Built with cutting-edge technologies like **Next.js**, **Express.js**, **MongoDB**, **Redis**, and **Three.js**, this system is tailored to meet the needs of hospitals, clinics, and educational institutions through a robust, full-stack architecture.

---

## ⚙️ Tech Stack Overview

| Layer        | Technology                                  |
|--------------|--------------------------------------------|
| **Frontend** | Next.js, TypeScript, TailwindCSS, ShadCN   |
| **State Mgmt** | TanStack Query, TanStack Table           |
| **Backend**  | Express.js (TypeScript), Zod, Config       |
| **Database** | MongoDB (Deep schema for anatomical data)  |
| **Realtime** | Redis Pub/Sub, Socket.IO                   |
| **Auth**     | JWT (access/refresh), NextAuth             |
| **3D Graphics** | Three.js, Blender                       |
| **Monitoring** | Prometheus (custom metrics & dashboards) |
| **Deployment** | Docker, Kubernetes-ready, Makefile-based |

---

## 📂 Project Structure

The project follows a modular folder structure for better scalability and maintainability:

```
```
hospital-management-system/
├── backend/                # Backend services (Express.js, Zod validation)
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── server.ts           # Centralized service startup
├── frontend/               # Frontend application (Next.js)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Next.js pages
│   ├── styles/             # TailwindCSS styles
│   └── utils/              # Frontend utilities
├── docker/                 # Docker configuration files
├── scripts/                # Deployment and automation scripts
├── Makefile                # Makefile for Docker orchestration
└── README.md               # Project documentation
```

---

## 📦 Features at a Glance

### 🔐 Authentication & Access Control
- Secure JWT-based authentication with auto-refresh middleware
- Role-based access control for granular permissions
- NextAuth integration for session-based frontend authentication

### 🧩 Modular Architecture
- Microservices for core modules like users, appointments, and pharmacy
- Centralized service orchestration via `server.ts`
- Multi-tenant support for managing multiple hospital instances

### 🧑‍⚕️ Core Modules
- Comprehensive patient and staff management
- Doctor dashboard with live appointment tracking
- Prescription and medical history management

### ⚡ Real-Time System
- Redis Pub/Sub and Socket.IO for real-time updates
- Live notifications for appointments, emergencies, and system alerts

### 🦷 3D Medical Viewer
- Interactive 3D oral cavity model with detailed tooth layers
- Tracks conditions such as decay, restorations, and more

### 📊 Admin & Metrics Dashboard
- API performance monitoring: error rates, success rates, and latency
- Visualized metrics using Recharts, powered by Prometheus

### ✅ Validation & Error Handling
- End-to-end validation using Zod (backend and frontend)
- Unified error response structure for consistent debugging

---

## 🚀 Getting Started

### 🐳 Docker-Based Deployment

This project leverages a `Makefile` for seamless Docker-based deployment, orchestrating services like the frontend, backend, MongoDB, Redis, and more.

#### Step-by-Step Instructions:

1. Clone the repository:
    ```bash
    git clone https://github.com/actual-username/hospital-management-system.git
    cd hospital-management-system
    ```

2. Start all services using Docker Compose:
    ```bash
    make up
    ```

3. Tear down all services:
    ```bash
    make down
    ```

For advanced deployment options, refer to the `docker/` directory and the `Makefile` for customizable configurations.

---

## 📖 Additional Resources

- **Documentation**: Detailed API and module documentation can be found in the `docs/` directory.
- **Contributing**: Contributions are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines.
- **License**: This project is licensed under the MIT License. See `LICENSE` for details.

---
