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
hospital-management-system/
├── backend/ # Backend services (Express.js, Zod validation)
│ ├── src/
│ │ ├── controllers/ # API controllers
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API routes
│ │ ├── services/ # Business logic
│ │ └── utils/ # Utility functions
│ └── server.ts # Centralized service startup
├── frontend/ # Frontend application (Next.js)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Next.js pages
│ ├── styles/ # TailwindCSS styles
│ └── utils/ # Frontend utilities
├── docker/ # Docker configuration files
├── scripts/ # Deployment and automation scripts
├── Makefile # Makefile for Docker orchestration
└── README.md # Project documentation
```


## 📦 Features Breakdown

### 1. **Authentication & Authorization**
- 🔐 JWT (Access & Refresh Tokens)
- 🔄 Auto refresh via `DeserializeUser` middleware
- 🧠 Role-Based Access (Admin, Doctor, Nurse, Patient)
- 🌍 NextAuth integration for session-based frontend auth

### 2. **Multi-Tenant & Modular Architecture**
- 🏥 Separate instances for multiple hospitals/clinics
- 🧩 Modular Express services for clean separation
- 🗃️ Centralized `server.ts` to start all services with one command

### 3. **Patient, Staff & Appointment Management**
- 📋 CRUD for patients, doctors, nurses, receptionists
- 📅 Scheduling with real-time update via Socket.IO
- 💊 Prescription handling, linked to doctors and pharmacists

### 4. **Real-Time Notification System**
- ⚡ Redis Pub/Sub + Socket.IO for scalable real-time events
- 🔔 Notifications for appointments, emergencies, alerts
- 🧑‍💻 Doctor dashboard receives live updates

### 5. **3D Medical Anatomy Viewer**
- 🦷 Oral cavity modeled using **Blender**
- 🧩 Interactive **Three.js** viewer for individual tooth dissection
- 📍 Tracks pathology (e.g. cavities, restorations) per tooth

### 6. **Dynamic Dashboards with Custom Metrics**
- 📊 API monitoring: success/error rate, latency, usage
- 📈 Built with Recharts, no Grafana dependency
- 🔍 Admin can track performance and system health

### 7. **Data Tables & UI/UX**
- 🧮 TanStack Table for filtering, sorting, pagination
- 🪄 TailwindCSS + ShadCN for responsive, accessible design
- 🧑‍💻 Clean, minimal, role-specific interfaces

### 8. **Consistent Validation & Error Handling**
- ✅ Zod schemas for request validation and parsing
- ❌ Global error handler with standardized responses
- 🧩 Middleware-based API protection and data access

### 9. **Hospital Services API**
- 🚑 APIs for medical records, diagnostics, staff roles
- 🔬 Pharmacy and lab services (modular & extendable)
- 📄 Swagger documentation (planned for full public API exposure)

---

## 🚀 Getting Started

### 🐳 Docker-Based Deployment

This project leverages a `Makefile` for seamless Docker-based deployment, orchestrating services like the frontend, backend, MongoDB, Redis, and more.

#### Step-by-Step Instructions:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/actual-username/hospital-management-system.git
    cd hospital-management-system
    ```

2. **Start all services using Docker Compose:**
    ```bash
    make up
    ```

3. **Tear down all services:**
    ```bash
    make down
    ```

> ⚙️ For advanced deployment, refer to the `docker/` directory and `Makefile` for service-specific configurations.

---

## 📖 Additional Resources

- **Documentation**: Detailed API and module documentation is available in the `docs/` directory.
- **Contributing**: Contributions are welcome! See `CONTRIBUTING.md` for guidelines.
- **License**: This project is licensed under the MIT License. See `LICENSE` for details.
