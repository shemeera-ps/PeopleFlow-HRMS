# PeopleFlow HRMS – Project Roadmap

**Version:** 1.0
**Status:** Active

---

# 1. Purpose

This roadmap defines the implementation order for PeopleFlow HRMS.

The objective is to build the application incrementally, completing one module at a time while maintaining a stable and working codebase.

Each milestone should result in a functional application that can be committed, tested, and merged into the `develop` branch.

---

# Development Principles

Throughout the project we will follow these principles:

- Build one module at a time.
- Finish a feature before starting another.
- Test before merging.
- Commit frequently.
- Refactor only after the feature works.
- Keep the application in a runnable state.

---

# Milestone 0 – Project Foundation

## Objective

Prepare the project for development.

### Backend

- Laravel project setup
- Environment configuration
- Database connection
- JWT package installation
- Base API structure

### Frontend

- React + Vite setup
- Folder structure
- Tailwind CSS
- Routing
- Axios configuration
- Zustand setup
- Authentication layout

### Deliverable

A running Laravel backend and React frontend connected to each other.

---

# Milestone 1 – Authentication & Authorization

## Features

- User Login
- Logout
- JWT Authentication
- Protected Routes
- Role Management
- Permission Management
- First Login Password Reset
- Change Password
- Forgot Password

### Deliverable

Users can securely log in and access the application based on their assigned permissions.

---

# Milestone 2 – Organization Management

## Features

### Departments

- Create
- Edit
- Delete
- View

### Designations

- Create
- Edit
- Delete
- View

### Deliverable

The organization structure is ready for employee management.

---

# Milestone 3 – Employee Management

## Features

- Employee CRUD
- Employee Profile
- Employment Details
- Emergency Contacts
- Bank Details
- Document Upload
- Profile Photo
- Search & Filters

### Deliverable

Complete employee lifecycle management.

---

# Milestone 4 – Attendance Management

## Features

- Attendance Records
- Check In
- Check Out
- Attendance Calendar
- Attendance Reports

### Deliverable

Employees' daily attendance can be tracked accurately.

---

# Milestone 5 – Leave Management

## Features

- Leave Types
- Leave Application
- Leave Approval
- Leave Balance
- Leave History

### Deliverable

Managers can approve leave requests and employees can monitor leave balances.

---

# Milestone 6 – Holiday Management

## Features

- Holiday CRUD
- Holiday Calendar
- Public Holidays
- Company Holidays

### Deliverable

Holiday schedules are available throughout the application.

---

# Milestone 7 – Payroll

## Features

- Salary Structure
- Allowances
- Deductions
- Payroll Processing
- Payslip Generation
- Payroll History

### Deliverable

Monthly payroll can be generated and employees can access their payslips.

---

# Milestone 8 – Recruitment

## Features

- Job Positions
- Candidate Management
- Interview Scheduling
- Interview Feedback
- Hiring Workflow

### Deliverable

Recruitment activities can be managed within the system.

---

# Milestone 9 – Performance Management

## Features

- Goal Management
- Performance Reviews
- Employee Ratings
- Manager Feedback

### Deliverable

Employee performance can be evaluated and recorded.

---

# Milestone 10 – Communication

## Features

### Announcements

- Create
- Edit
- Publish
- Expire

### Notifications

- System Notifications
- Email Notifications

### Deliverable

Users receive important updates and company announcements.

---

# Milestone 11 – Reports & Administration

## Features

- Employee Reports
- Attendance Reports
- Leave Reports
- Payroll Reports
- Audit Logs
- System Settings

### Deliverable

Administrative users can monitor, report, and configure the system.

---

# Milestone 12 – Testing & Production Readiness

## Tasks

- Manual Testing
- Bug Fixes
- UI Improvements
- Performance Review
- Code Cleanup
- Documentation Updates
- Final Database Seeding

### Deliverable

A stable Version 1.0 release ready for demonstration and deployment.

---

# Git Workflow During Development

Every milestone follows the same workflow:

```text
Create Feature Branch
        ↓
Develop Feature
        ↓
Test
        ↓
Commit Changes
        ↓
Push to GitHub
        ↓
Merge into develop
```

---

# Progress Tracker

| Milestone                      | Status |
| ------------------------------ | ------ |
| Project Foundation             | ⬜     |
| Authentication & Authorization | ⬜     |
| Organization Management        | ⬜     |
| Employee Management            | ⬜     |
| Attendance Management          | ⬜     |
| Leave Management               | ⬜     |
| Holiday Management             | ⬜     |
| Payroll                        | ⬜     |
| Recruitment                    | ⬜     |
| Performance Management         | ⬜     |
| Communication                  | ⬜     |
| Reports & Administration       | ⬜     |
| Testing & Production Release   | ⬜     |

---

# Definition of Done

A milestone is considered complete only when:

- Backend functionality is implemented.
- Frontend screens are complete.
- Validation is working.
- Authorization is implemented.
- Manual testing is completed.
- Code follows project standards.
- Changes are committed and pushed to GitHub.
- The application builds without errors.

---

# Version 1.0 Goal

The objective of Version 1.0 is to deliver a fully functional Human Resource Management System that demonstrates:

- Clean software architecture.
- Professional Laravel development.
- Modern React development.
- Secure JWT authentication.
- Role-based authorization.
- RESTful API design.
- Production-quality coding practices.

This project is intended to showcase full-stack development skills while serving as a strong portfolio project for technical interviews.
