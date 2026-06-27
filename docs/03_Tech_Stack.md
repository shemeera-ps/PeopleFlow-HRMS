# PeopleFlow HRMS – Technology Stack

## 1. Overview

This document defines the official technology stack for PeopleFlow HRMS. The selected technologies prioritize stability, maintainability, scalability, and a practical learning path while following modern full-stack development practices.

The core architecture will remain stable throughout Version 1 of the project. Supporting libraries may be introduced or replaced if project requirements evolve.

---

# 2. Core Technology Stack

| Layer              | Technology        | Purpose                               |
| ------------------ | ----------------- | ------------------------------------- |
| Frontend           | React 19          | Build the user interface              |
| Language           | JavaScript (ES6+) | Frontend development                  |
| Build Tool         | Vite              | Fast development and optimized builds |
| Styling            | Tailwind CSS      | Utility-first CSS framework           |
| UI Components      | shadcn/ui         | Accessible, reusable UI components    |
| Routing            | React Router      | Client-side routing                   |
| HTTP Client        | Axios             | API communication                     |
| Server State       | TanStack Query    | Data fetching and caching             |
| Form Management    | React Hook Form   | Form handling                         |
| Validation         | Zod               | Schema-based validation               |
| Global State       | Zustand           | Lightweight state management          |
| Backend            | Laravel 12        | REST API and business logic           |
| Language           | PHP 8.4+          | Backend development                   |
| ORM                | Eloquent ORM      | Database interaction                  |
| Database           | MySQL 8           | Relational database                   |
| Authentication     | JWT               | Stateless authentication              |
| File Storage       | Laravel Storage   | File uploads and document storage     |
| Version Control    | Git               | Source control                        |
| Repository Hosting | GitHub            | Code hosting and collaboration        |

---

# 3. Frontend Technologies

## React

React is used to build a modern, component-based user interface.

## JavaScript (ES6+)

Version 1 of PeopleFlow HRMS will use modern JavaScript instead of TypeScript. This allows development to focus on mastering React fundamentals, component architecture, hooks, routing, state management, and API integration without introducing additional complexity.

A future version of the project may migrate the frontend to TypeScript as a planned enhancement.

## Vite

Provides a fast development server, instant hot module replacement, and optimized production builds.

## Tailwind CSS

Used to build a consistent, responsive, and maintainable user interface.

## shadcn/ui

Provides customizable and accessible UI components built with Tailwind CSS.

## React Router

Handles application routing and protected routes.

## Axios

Communicates with the Laravel REST API.

## TanStack Query

Handles server-side state, caching, background synchronization, and request management.

## React Hook Form

Simplifies form handling while maintaining good performance.

## Zod

Provides reusable validation schemas that integrate well with React Hook Form.

## Zustand

Manages lightweight global application state, including authentication and user preferences.

---

# 4. Backend Technologies

## Laravel 12

Provides the REST API, authentication, authorization, validation, business logic, notifications, and integrations.

## PHP 8.4+

Uses modern PHP features and Laravel best practices.

## Eloquent ORM

Handles model relationships, database queries, and transactions.

## JWT Authentication

Provides stateless authentication between the React frontend and Laravel backend.

---

# 5. Database

## MySQL 8

MySQL is used as the primary relational database.

Features utilized include:

- Foreign keys
- Transactions
- Indexing
- Constraints
- Relational integrity

---

# 6. Development Tools

| Tool         | Purpose                   |
| ------------ | ------------------------- |
| Git          | Version control           |
| GitHub       | Repository hosting        |
| Laravel Pint | PHP code formatting       |
| ESLint       | JavaScript linting        |
| Prettier     | Code formatting           |
| Husky        | Git hooks                 |
| lint-staged  | Pre-commit quality checks |

---

# 7. Testing Strategy

Backend

- PHPUnit
- Laravel Feature Tests

Frontend

- React Testing Library (planned)

---

# 8. Planned Future Enhancements

The following technologies are planned for future versions as the project grows:

- TypeScript migration
- Redis caching
- Queue workers
- Docker
- GitHub Actions (CI/CD)
- WebSocket notifications
- FullCalendar
- Recharts
- Excel import/export
- PDF generation

---

# 9. Technology Selection Principles

Technology decisions are based on the following principles:

- Stability over novelty
- Strong community support
- Production readiness
- Long-term maintainability
- Clear documentation
- Modular architecture
- Excellent developer experience
- Progressive learning

---

# 10. Planned Version 2 Improvements

After completing Version 1, the project roadmap includes:

- Migrating the React frontend from JavaScript to TypeScript.
- Adding comprehensive frontend tests.
- Introducing Docker-based development and deployment.
- Implementing CI/CD pipelines.
- Optimizing performance with Redis and background queues.

This phased approach allows the project to evolve while maintaining a solid, working foundation.
