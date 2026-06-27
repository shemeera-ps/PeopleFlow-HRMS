# PeopleFlow HRMS – Database Design

**Version:** 1.0
**Status:** Active

---

# 2. Database Technology

| Property       | Value                    |
| -------------- | ------------------------ |
| Database       | MySQL 8                  |
| ORM            | Laravel Eloquent         |
| Primary Key    | BIGINT (Auto Increment)  |
| Character Set  | utf8mb4                  |
| Collation      | utf8mb4_unicode_ci       |
| Storage Engine | InnoDB                   |
| Time Zone      | UTC                      |
| Soft Deletes   | Enabled where applicable |

---

# 3. Database Design Principles

The database design follows these principles:

- Third Normal Form (3NF)
- Avoid duplicated data
- Enforce referential integrity
- Use foreign key constraints
- Index searchable columns
- Use nullable fields only when appropriate
- Maintain audit information
- Design for scalability

---

# 4. Naming Conventions

## Tables

Rules

- lowercase
- plural
- snake_case

Examples

```text
users
employees
departments
leave_requests
attendance_records
salary_structures
```

---

## Columns

Rules

- lowercase
- snake_case

Examples

```text
first_name
employee_code
joining_date
date_of_birth
created_at
```

---

## Foreign Keys

Rules

```text
department_id
employee_id
role_id
designation_id
manager_id
```

---

## Pivot Tables

Rules

Singular names in alphabetical order.

Examples

```text
permission_role
role_user
employee_skill
```

---

# 5. Common Columns

Most business tables should contain:

| Column     | Type                    |
| ---------- | ----------------------- |
| id         | BIGINT                  |
| created_at | TIMESTAMP               |
| updated_at | TIMESTAMP               |
| deleted_at | TIMESTAMP (Soft Delete) |
| created_by | BIGINT Nullable         |
| updated_by | BIGINT Nullable         |
| deleted_by | BIGINT Nullable         |

This provides a complete audit trail for business data.

---

# 6. Core Database Modules

The database is organized into logical domains.

```text
Authentication

↓

Organization

↓

Employees

↓

Attendance

↓

Leave

↓

Payroll

↓

Recruitment

↓

Performance

↓

Notifications

↓

Reports

↓

Audit Logs
```

---

# 7. Authentication Tables

## users

Stores login credentials.

Important fields

```text
id
employee_id
email
password
email_verified_at
is_active
last_login_at
remember_token
created_at
updated_at
```

---

## roles

Stores system roles.

Example

```text
Administrator

HR Manager

Manager

Employee
```

Fields

```text
id

name

description
```

---

## permissions

Stores every available permission.

Examples

```text
employee.create

employee.edit

employee.delete

leave.approve

payroll.generate
```

---

## role_permission

Maps permissions to roles.

Relationship

```text
Role

↓

Many-to-Many

↓

Permission
```

---

## user_role

Maps users to roles.

Relationship

```text
User

↓

Many-to-Many

↓

Role
```

---

# 8. Organization Tables

## departments

```text
id

department_name

department_code

manager_id

description

status
```

---

## designations

```text
id

designation_name

department_id

description

status
```

---

# 9. Employee Module Tables

## employees

This is the primary business table.

Important fields

```text
id

employee_code

first_name

last_name

gender

date_of_birth

phone

email

department_id

designation_id

joining_date

employment_type

employment_status

manager_id

profile_photo

address

city

state

country

postal_code
```

---

## employee_documents

Stores uploaded employee documents.

Examples

```text
Resume

Passport

PAN

Aadhaar

Driving License

Educational Certificates
```

Fields

```text
employee_id

document_type

file_name

file_path
```

---

## emergency_contacts

```text
employee_id

contact_name

relationship

phone_number

email
```

---

## employee_bank_accounts

```text
employee_id

bank_name

account_number

ifsc_code

branch_name

account_holder_name
```

---

# 10. Attendance Module

## attendance_records

```text
employee_id

attendance_date

check_in

check_out

working_hours

late_minutes

overtime_minutes

attendance_status
```

Attendance status examples

```text
Present

Absent

Half Day

Holiday

Leave

Weekend
```

---

# 11. Leave Module

## leave_types

Examples

```text
Casual Leave

Sick Leave

Earned Leave

Maternity Leave
```

---

## leave_requests

```text
employee_id

leave_type_id

start_date

end_date

number_of_days

reason

status

approved_by

approved_at
```

Status

```text
Pending

Approved

Rejected

Cancelled
```

---

## leave_balances

```text
employee_id

leave_type_id

allocated

used

remaining
```

---

# 12. Holiday Module

## holidays

```text
holiday_name

holiday_date

holiday_type

description
```

---

# 13. Payroll Module

## salary_structures

```text
employee_id

basic_salary

currency

effective_from

effective_to
```

---

## salary_allowances

```text
salary_structure_id

allowance_name

amount
```

---

## salary_deductions

```text
salary_structure_id

deduction_name

amount
```

---

## payrolls

```text
employee_id

pay_period

gross_salary

total_allowances

total_deductions

net_salary

payment_status
```

Status

```text
Pending

Processed

Paid
```

---

## payslips

```text
payroll_id

generated_date

file_path
```

---

# 14. Recruitment Module

## job_positions

```text
title

department_id

vacancies

description

status
```

---

## candidates

```text
first_name

last_name

email

phone

resume_path

status
```

---

## interviews

```text
candidate_id

interviewer_id

interview_date

interview_type

feedback

result
```

---

# 15. Performance Module

## performance_reviews

```text
employee_id

reviewer_id

review_period

overall_rating

comments
```

---

## performance_goals

```text
employee_id

goal_title

target_date

status
```

---

# 16. Announcement Module

## announcements

```text
title

content

publish_date

expiry_date

visibility
```

---

# 17. Notification Module

## notifications

```text
user_id

title

message

is_read

notification_type
```

---

# 18. Audit Module

## audit_logs

```text
user_id

action

table_name

record_id

old_values

new_values

ip_address

user_agent

created_at
```

This table records important system activity for traceability.

---

# 19. Relationships Overview

```text
Department
      │
      ├─────────────┐
      ▼             ▼
Designation     Employee
                     │
      ┌──────────────┼─────────────┐
      ▼              ▼             ▼
Attendance      Leave        Payroll
                     │
                     ▼
                Payslip

Employee
      │
      ├────────► Documents
      ├────────► Emergency Contacts
      └────────► Bank Accounts

User
      │
      ▼
Roles
      │
      ▼
Permissions
```

---

# 20. Indexing Strategy

Indexes should be created on:

Employee

```text
employee_code

email

department_id
```

Attendance

```text
employee_id

attendance_date
```

Leave

```text
employee_id

status

start_date
```

Payroll

```text
employee_id

pay_period
```

Audit Logs

```text
user_id

created_at
```

Only index frequently searched or joined columns.

---

# 21. Migration Strategy

Migration rules:

- One logical change per migration.
- Never modify an existing migration after it has been executed in shared environments.
- Create a new migration for schema changes.
- Use foreign key constraints.
- Define indexes during migration creation.
- Seed only essential reference data.

---

# 22. Seeder Strategy

Initial seeders will include:

```text
RoleSeeder

PermissionSeeder

DepartmentSeeder

DesignationSeeder

HolidaySeeder

LeaveTypeSeeder

AdminUserSeeder
```

Development-only seeders may generate demo employees, attendance records, leave requests, and payroll data.

---

# 23. Factory Strategy

Factories will exist for:

- User
- Employee
- Department
- Attendance Record
- Leave Request
- Candidate
- Payroll

Factories are intended for testing and local development only.

---

# 24. Future Database Enhancements

Version 2 may introduce:

- Multi-company (tenant) support.
- Database partitioning for large attendance datasets.
- Read replicas for reporting.
- Redis caching.
- Full-text search.
- Database archiving strategy.

---

# 25. Database Design Philosophy

The database should prioritize:

- Data integrity over convenience.
- Normalization over duplication.
- Clear relationships.
- Efficient querying.
- Scalability.
- Maintainability.

Every table should represent a single business concept, and every relationship should reflect a real business rule. The schema should evolve through version-controlled migrations rather than manual database changes.
