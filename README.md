# 🛠️ fyndi

> _"Turn work experience into a portable professional reputation."_

Fyndi is a marketplace and professional-history platform designed for skilled workers, particularly those operating in Kenya's informal economy.

It connects clients with fundis while turning completed work into structured, evidence-backed professional history.

---

## The Problem

A skilled worker can have years of experience and hundreds of completed jobs without having a convetional resume that accurately represents their career.

Their professional history may be scattered across:

- WhatsApp conversations
- Phone contacts
- Photographs of completed work
- Invoices
- Payment records
- Referrals
- Word of mouth

Those may demonstrate experience, but they are fragmented and difficult for a new customer or business to independently evaluate.

The fundamental problem is:

> _How does someone who has built a career through practical work prove what they have actually done?._

---

## The Idea

Fyndi combines a **local-service marketplace** with **persistent professional-history layer**.

A professional joins Fyndi, create a profile and receives opportunities through the marketplace.

When work is completed, the job can become part of the professional's history.

    _Marketplace -> Jobs -> Completed Work -> Evidence -> Verification -> Professional History -> Reputation_

Over time, individual work events can accumilate into professional record.

Instead of simply saying:

> _"I've been doing this for ten years"._

A professional can build a history of the work they have actually perfomed.

---

## How Fyndi Works

The intended workflow is:

    _Client needs a service -> Post a job -> Fundis discover -> Client selects a fundi -> Work is perfomed -> Job is recorded -> Evidence can be attached -> Both parties confirm completion -> Completed work contributes to professional history_

The marketplace creates the environment where work happens.

The professional-history layer preserves what happened afterward.

---

## What Makes Fyndi Different?

Fyndi is not primarily a certification platform.

A professional should not necessarily need a formal certificate before being able to build a professional identity.

They can join, perform work, and gradualy build a history through real jobs.

---

## Trust and Verification

Reputatin has a value, which means the system must assume that some users will attempt to manipulate it.

For example:

    _Worker + Friend -> Fake Job -> Both accounts confirm it -> Fake evidence -> Fake reputation_

Therefore, Fyndi distinguishes between **claims** and **evidence**.

A completed job can have different leves of supporting evidence:

| Evidence Level             | Example                                                |
| -------------------------- | ------------------------------------------------------ |
| **Self-reported**          | Worker claims the job occured                          |
| **Customer confirmed**     | Customer confirms completion                           |
| **Evidence backed**        | Documents or photographs attached                      |
| **Payments evidence**      | Payment information submitted                          |
| **Independently verified** | Information corroborated through an independent source |

The objective is not to pretend that Fyndi can automatically determine whether every job is genuine.

The objective is to make fabricated professional histories **more difficult to create and easier to detect**.

## Auditability

Important job transitions can be represented as events rather than relying solely on an editable status field.

For example:

    - JOB_CREATED
    - WORKER_ACCEPTED
    - WORK_STARTED
    - PAYMENT_RECORDED
    - WORKER_MARKED_COMPLETED
    - CUSTOMER_MARKED_COMPLETED
    - JOB_COMPLETED

This created an auditable history of how a job is reached its final state.

---

## Payments

Fyndi is designed around a simple principle:

> _Fyndi does not handle money._

Customers can continue paying professionals directly through existing payment systems such as M-Pesa or bank transfers.

Fyndi's role is to provide the marketplace, relationship and professional-history layer around the work.

Payment information may become and additional source of evidence where appropriate integrations are available.

However, user-submitted payment screenshots or messages should be treated as **submitted evidence**, not automatically as proof of a transaction.

This keeps Fyndi from needing to become a:

- Wallet
- Escrow service
- Payment processor
- Financial intermediary

---

## The Professional Profile

Over time, a professional's profile can represent more than a star rating.

For example:

`John Mwangi`
`Electrician`
`Recorded jobs: 127`
`Participating clients: 96`
`Customer confirmations: 112`
`Average rating: 4.7 / 5`

`Areas of work:`
`- Residential wiring`
`- Commercial wiring`
`- Solar installation`
`- Electrical repairs`

The goal is to make practical experience more visible, structured and portable.

---

## Technical Architecture

Fyndi is being developed as a **backend-focused system** with an emphasis on security, data integrity and audible workflows.

The architecture is organised around modular backend components.

Areas of the system include:

- Authentication and authorization
- User and role management
- Job lifecycle management
- Professional profiles
- Reviews and reputation
- Evidence management
- Audit logs
- Notifications
- Real-time communication
- Verification workflows

The system is designed to evolve toward event-driven workflows where appropriate.

---

## Tech Stack

| Layer                        | Technology                        |
| ---------------------------- | --------------------------------- |
| **Backend**                  | Node.js (Express), Typescript     |
| **Database**                 | PostgreSQL                        |
| **Auth**                     | JWT, OAuth, bcrypt, RBAC          |
| **Real-time**                | Websockets / Socket.IO            |
| **Caching & infrastructure** | Redis                             |
| **File Uploads (optional)**  | Cloudinary                        |
| **Mailing**                  | Nodemailer                        |
| **File Storage**             | Cloudinary                        |
| **Testing**                  | Automated API/integration testing |
| **Deployment**               | Docker / cloud deployment         |

The exact implementation will develop as the system develops.

---

## Roadmap

### Core Platform

- Client and fundi accounts
- Authentication
- Role-based authorization
- Job creation and discovery
- Job lifecycle management
- Offers / applications
- Reviews and ratings
- Professional profiles

### Trust & Reputation

- Completed-work records
- Evidence attachments
- Completion confirmation
- Audit history
- Verification levels
- Dispute mechanisms
- Reputation system

### Communication

- Real-time job communication
- WebSocket-based chat
- Real-time notifications
- Email notifications

### Infrastructure

- Redis
- Background jobs
- Automated testing
- Docker
- Production deployment
- Monitoring and observability
