# PeopleFlow HRMS – Coding Standards

**Version:** 1.0
**Status:** Active
**Applies To:** Laravel Backend, React Frontend, Database Design, Git Workflow

---

# 1. Purpose

This document defines the coding standards and best practices for the PeopleFlow HRMS project.

The goals are to:

- Maintain a consistent codebase.
- Improve readability.
- Reduce technical debt.
- Simplify debugging.
- Encourage reusable components.
- Follow modern software engineering practices.

All contributors should follow these standards throughout the project.

---

# 2. General Principles

Every piece of code should follow these principles.

## Keep It Simple (KISS)

Write the simplest solution that solves the problem.

Avoid unnecessary complexity.

---

## Don't Repeat Yourself (DRY)

Never duplicate business logic.

If the same logic is needed in multiple places, extract it into a reusable function, service, helper, or component.

---

## Single Responsibility Principle (SRP)

Every class, component, and function should have one clear responsibility.

Good Example

- EmployeeController handles HTTP requests.
- EmployeeService contains business logic.
- Employee model represents employee data.

Bad Example

A controller that validates data, uploads files, sends emails, performs calculations, and writes directly to multiple database tables.

---

## Readability Over Cleverness

Prefer code that is easy to understand over code that is short but difficult to maintain.

Code is read far more often than it is written.

---

# 3. Backend Coding Standards (Laravel)

## Follow PSR-12

All PHP code should follow the PSR-12 coding standard.

Formatting will be enforced using Laravel Pint.

---

## Thin Controllers

Controllers should:

- Receive requests.
- Call services.
- Return responses.

Controllers should **not** contain business logic.

Good

```php
public function store(StoreEmployeeRequest $request)
{
    return $this->employeeService->create($request->validated());
}
```

Avoid placing validation rules, calculations, email sending, or complex database operations directly in controllers.

---

## Business Logic in Services

Complex business rules belong in Service classes.

Examples:

- Leave approval workflow
- Payroll calculations
- Attendance processing
- Employee onboarding

---

## Validation

Always use Form Request classes.

Do not validate directly inside controllers.

Correct:

```text
StoreEmployeeRequest
UpdateEmployeeRequest
LoginRequest
```

---

## API Resources

All API responses should be returned using Laravel API Resources.

Avoid returning Eloquent models directly.

---

## Database Access

Always use Eloquent relationships where appropriate.

Avoid raw SQL unless there is a demonstrated performance or functionality requirement.

---

## Mass Assignment

Always define `$fillable` (or `$guarded` if intentionally appropriate).

Never leave models vulnerable to mass assignment.

---

## Route Organization

Use API resource routes where appropriate.

Group routes by feature and protect them with middleware.

Example:

```php
Route::middleware('auth:api')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
});
```

---

# 4. Frontend Coding Standards (React)

## Functional Components Only

Use functional components with React Hooks.

Do not use class components.

---

## Component Design

Each component should have one responsibility.

Good examples:

- EmployeeCard
- EmployeeTable
- EmployeeForm
- EmployeeDetails

Avoid components that combine unrelated responsibilities.

---

## Component Size

As a guideline:

- Under 150 lines is preferred.
- Consider refactoring components larger than ~300 lines.

This is a guideline, not a strict rule.

---

## Custom Hooks

Extract reusable logic into custom hooks.

Examples:

- useAuth
- useEmployees
- usePagination

---

## Props

Pass only the props a component needs.

Avoid unnecessary prop drilling. Shared state should be managed through the application's state management strategy.

---

# 5. File Naming

Use PascalCase for:

- Components
- Pages
- Layouts

Examples

```text
EmployeeTable.jsx
Dashboard.jsx
EmployeeProfile.jsx
```

Use camelCase for:

```text
employeeApi.js
dateFormatter.js
authService.js
```

Use lowercase for folders.

```text
components/
pages/
hooks/
services/
```

---

# 6. Naming Conventions

Choose names that clearly describe purpose.

Good

```text
calculatePayroll()

sendWelcomeEmail()

approveLeave()
```

Avoid vague names such as:

```text
process()

handle()

data()

temp()

test()
```

---

# 7. Database Standards

Primary keys:

```text
id
```

Foreign keys:

```text
employee_id

department_id

manager_id
```

Table names:

- lowercase
- plural
- snake_case

Examples

```text
employees

leave_requests

attendance_records
```

Columns:

snake_case

Examples

```text
first_name

joining_date

created_at
```

---

# 8. API Standards

All API responses should follow a consistent structure.

Successful Response

```json
{
  "success": true,
  "message": "Employee created successfully.",
  "data": {}
}
```

Validation Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {}
}
```

Server Error

```json
{
  "success": false,
  "message": "Internal server error."
}
```

---

# 9. Error Handling

Never expose stack traces or sensitive information to end users.

Return meaningful, user-friendly error messages while logging detailed errors on the server.

---

# 10. Comments

Write self-explanatory code.

Comments should explain **why**, not **what**.

Good

```php
// Prevent duplicate attendance records for the same employee and day.
```

Avoid

```php
// Increment i
$i++;
```

---

# 11. Logging

Use Laravel's logging facilities.

Log:

- Exceptions
- Failed authentication attempts
- Critical business events
- Unexpected failures

Do not log sensitive information such as passwords or authentication tokens.

---

# 12. Security

Always:

- Validate input.
- Authorize actions.
- Escape output where appropriate.
- Hash passwords.
- Sanitize uploaded file names.
- Restrict file upload types.
- Use environment variables for secrets.

Never hardcode credentials or API keys.

---

# 13. Git Commit Standards

Follow Conventional Commits.

Examples:

```text
feat(auth): implement JWT login

feat(employee): add employee CRUD

fix(api): resolve validation issue

refactor(payroll): simplify salary calculation

docs: update coding standards

style: apply Laravel Pint formatting

test: add employee feature tests
```

Each commit should represent one logical change.

---

# 14. Code Reviews (Even for a Solo Project)

Before merging a feature:

- Is the code readable?
- Does it follow project standards?
- Is business logic in the correct layer?
- Are validation and authorization implemented?
- Are errors handled properly?
- Are there opportunities to simplify the code?

Treat every merge as though another developer will maintain it.

---

# 15. Code Quality Checklist

Before committing, verify:

- [ ] Code builds successfully.
- [ ] No unnecessary comments remain.
- [ ] No unused imports or variables.
- [ ] Validation is implemented.
- [ ] Authorization is implemented where required.
- [ ] API responses follow the standard format.
- [ ] Formatting tools have been run.
- [ ] No secrets or credentials are committed.
- [ ] Code has been manually tested.

---

# 16. Guiding Philosophy

PeopleFlow HRMS should prioritize:

- Readability over cleverness.
- Consistency over personal preference.
- Simplicity over unnecessary abstraction.
- Maintainability over short-term speed.

Every feature should leave the codebase cleaner, more understandable, and easier to extend than before it was added.
