# PeopleFlow HRMS – System Architecture

## 1. Overview

PeopleFlow HRMS follows a modern client-server architecture where the frontend and backend are developed as independent applications communicating through REST APIs.

This separation improves maintainability, scalability, testing, and deployment flexibility.

---

# 2. High-Level Architecture

```
                    +----------------------+
                    |      End Users       |
                    +----------+-----------+
                               |
                               |
                        HTTPS Requests
                               |
                               ▼
                    +----------------------+
                    |   React Frontend     |
                    |  (TypeScript + Vite) |
                    +----------+-----------+
                               |
                         Axios REST API
                               |
                               ▼
                    +----------------------+
                    |   Laravel Backend    |
                    |      REST API        |
                    +----------+-----------+
                               |
                 Business Logic & Services
                               |
                               ▼
                    +----------------------+
                    |       MySQL          |
                    +----------------------+
                               |
                  File Storage / Email Queue
```

---

# 3. Architecture Components

## Frontend Layer

Responsibilities:

- User Interface
- Form Validation
- Routing
- State Management
- API Communication
- Authentication Handling

Technology:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- React Hook Form

---

## Backend Layer

Responsibilities:

- Authentication
- Authorization
- Business Logic
- Validation
- API Endpoints
- Database Access
- File Uploads
- Notifications

Technology:

- Laravel
- PHP
- Eloquent ORM
- JWT Authentication

---

## Database Layer

Responsibilities:

- Persistent storage
- Relationships
- Transactions
- Indexing

Technology:

- MySQL

---

## Storage Layer

Stores:

- Employee documents
- Profile images
- Generated reports

---

# 4. Authentication Flow

```
User Login

↓

React Login Form

↓

Laravel API

↓

Credential Validation

↓

JWT Token Generated

↓

Token Returned

↓

Frontend Stores Token

↓

Authenticated Requests
```

---

# 5. Request Lifecycle

```
Browser

↓

React Component

↓

Axios Request

↓

Laravel Route

↓

Middleware

↓

Controller

↓

Service Layer

↓

Repository / Model

↓

Database

↓

JSON Response

↓

React UI Update
```

---

# 6. Security Architecture

Security measures include:

- JWT Authentication
- Password Hashing
- Input Validation
- Authorization Policies
- Middleware Protection
- CSRF Protection (where applicable)
- SQL Injection Prevention
- XSS Protection
- Rate Limiting
- Secure File Upload Validation

---

# 7. Layered Architecture

```
Presentation Layer
        │
        ▼
API Layer
        │
        ▼
Business Logic Layer
        │
        ▼
Data Access Layer
        │
        ▼
Database
```

Each layer has a single responsibility and communicates only with adjacent layers.

---

# 8. Scalability Considerations

The architecture is designed to support future enhancements such as:

- Redis caching
- Queue workers
- Background jobs
- WebSocket notifications
- Multi-tenancy
- Docker deployment
- CI/CD pipelines
- Cloud object storage
- Horizontal scaling

---

# 9. Architectural Principles

- Separation of Concerns
- Single Responsibility Principle
- RESTful API Design
- Modular Development
- Reusable Components
- Secure by Default
- Documentation-Driven Development
- Clean Architecture Practices
- Maintainability
- Extensibility
