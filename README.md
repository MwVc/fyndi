# 🛠️ fyndi

Fyndi is a **fullstack platform** designed to connect **clients** with **fundis** (skilled workers) in a secure, transparent and efficient way.
It helps users **find trusted professionals** and **manage jobs**.

---

## 🚀 Vision

Fyndi's mission is to **bridge the trust gap** between clients and local fundis.
It empowers small-scale skilled workers with visibility and reputation, while protecting clients through transparent contracts

> _"Building trust in local skills, one job at a time."_

---

## ⚙️ Tech Stack

| Layer                       | Technology        | Description                                                          |
| --------------------------- | ----------------- | -------------------------------------------------------------------- |
| **Backend**                 | Node.js (Express) | Core REST API handling requests, authentication, and data management |
| **Database**                | PostgreSQL        | Stores all users, jobs and reviews with relational integrity         |
| **Auth**                    | JWT + bcrypt      | Handles secure authentication and password hashing                   |
| **Environment**             | dotenv            | Manages environment variables for secure configuration               |
| **Server Restart**          | nodemon           | Enables automatic reloads during development                         |
| **File Uploads (optional)** | Cloudinary        | Stores images or documents for verification                          |
| **Mailing**                 | Nodemailer        | Sends email notifications and confirmations                          |

---

## 🧠 System Overview

### 🧭 Core Concept

Fyndi connects **clients** and **Fundis** in a trusted ecosystem:

1. Clients post job requests
2. Fundis apply or get matched automatically
3. Clients choose and apply for the job
4. Fundi completes the job

---

## 👥 User Roles

### 👤 Client

- Registers or logs in
- Posts jobs (type, location, budget, description)
- Reviews matched fundis and sends offers
- Client selects fundi from offers received
- Fundi completes work
- Client rates and reviews fundi

### 👷🏽 Fundi

- Registers or logs in
- Uploads skill certificates or IDs for verification
- Browses or receives matched jobs
- Accepts or negotiates offers
- Marks jobs as completed
- Receives payment after client approval
- Builds reputation through reviews

---

## 🔩 Backend Architecture

Fyndi follows the **MVC pattern** with modular organization.

## 🧱 Future Enhancements

- Implement real-time notifications(Socket.io)
- Add job recommendation algorithm
