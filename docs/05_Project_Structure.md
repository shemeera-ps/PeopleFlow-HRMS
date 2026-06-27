# PeopleFlow HRMS – Project Structure

**Version:** 1.0
**Status:** Active

---

# 1. Purpose

This document defines the official directory structure for the PeopleFlow HRMS project.

The objectives are to:

- Keep the project organized.
- Make files easy to locate.
- Encourage separation of concerns.
- Support future scalability.
- Ensure consistency throughout development.

Every new file added to the project should follow this structure unless a documented architectural decision states otherwise.

---

# 2. Repository Structure

```
PeopleFlow-HRMS/
│
├── backend/                 # Laravel REST API
├── frontend/                # React Application
├── docs/                    # Project Documentation
├── diagrams/                # Draw.io / Architecture diagrams
├── README.md
├── LICENSE
└── .gitignore
```

---

# 3. Backend Structure (Laravel)

```
backend/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── vendor/
└── artisan
```

The following sections describe the important application folders.

---

# 4. app/ Directory

```
app/
│
├── Http/
├── Models/
├── Services/
├── Policies/
├── Notifications/
├── Jobs/
├── Traits/
├── Helpers/
├── Mail/
├── Providers/
└── Exceptions/
```

---

# 5. Http/

```
Http/
│
├── Controllers/
├── Middleware/
├── Requests/
└── Resources/
```

## Controllers

Responsibilities:

- Receive requests.
- Call Services.
- Return API Resources.

Should NOT contain:

- Business logic
- Complex calculations
- Direct validation rules

---

## Requests

Contains Laravel Form Requests.

Example

```
StoreEmployeeRequest.php

UpdateEmployeeRequest.php

LoginRequest.php
```

Purpose

- Validation
- Authorization

---

## Resources

API Resources transform models into consistent JSON responses.

Never return Eloquent models directly.

---

## Middleware

Contains request filters such as:

- Authentication
- Authorization
- Logging
- Rate limiting

---

# 6. Models/

Contains Eloquent models.

Example

```
User.php

Employee.php

Department.php

Attendance.php
```

Models should contain:

- Relationships
- Query scopes
- Attribute casting
- Accessors / Mutators

Models should NOT contain complex business workflows.

---

# 7. Services/

Contains business logic.

Example

```
EmployeeService.php

PayrollService.php

AttendanceService.php

LeaveService.php
```

Examples of responsibilities:

- Employee onboarding
- Leave approval
- Payroll calculation
- Attendance processing

Every complex workflow belongs here.

---

# 8. Policies/

Authorization logic.

Example

```
EmployeePolicy.php

LeavePolicy.php
```

Policies answer questions such as:

- Can this user update this employee?
- Can this manager approve leave?

---

# 9. Notifications/

Contains Laravel Notifications.

Example

```
LeaveApprovedNotification.php

WelcomeEmployeeNotification.php
```

---

# 10. Jobs/

Background jobs.

Examples

```
GeneratePayrollJob.php

SendBulkEmailJob.php
```

Jobs should be used for long-running tasks.

---

# 11. Traits/

Contains reusable behavior shared by multiple classes.

Example

```
HasProfilePhoto.php

LogsActivity.php
```

Traits should be used sparingly and only for genuinely shared behavior.

---

# 12. Helpers/

Contains reusable helper functions that do not naturally belong to a model or service.

Example

```
DateHelper.php

SalaryHelper.php
```

Avoid placing business rules here.

---

# 13. Database Structure

```
database/
│
├── migrations/
├── seeders/
└── factories/
```

## Migrations

One migration per database change.

Example

```
create_employees_table.php

add_department_to_employees_table.php
```

---

## Seeders

Populate development data.

Example

```
RoleSeeder.php

PermissionSeeder.php

DepartmentSeeder.php
```

---

## Factories

Generate fake data for testing and local development.

---

# 14. Routes

```
routes/

api.php

web.php

console.php
```

PeopleFlow HRMS will primarily use `api.php`.

---

# 15. Frontend Structure

```
frontend/

src/
│
├── api/
├── assets/
├── components/
├── constants/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

---

# 16. api/

Contains API endpoint definitions.

Example

```
employeeApi.js

leaveApi.js

payrollApi.js
```

Responsibilities:

- API URLs
- HTTP requests
- Response handling

No UI logic.

---

# 17. assets/

Contains static resources.

```
images/

icons/

fonts/

logos/
```

---

# 18. components/

Contains reusable UI components.

Suggested structure

```
components/
│
├── common/
├── forms/
├── layout/
├── tables/
├── ui/
└── feedback/
```

Examples

```
Button.jsx

Input.jsx

DataTable.jsx

Loader.jsx

Modal.jsx

Pagination.jsx
```

Reusable components only.

Do not place page-specific logic here.

---

# 19. pages/

Represents complete application pages.

Example

```
Dashboard.jsx

Employees.jsx

EmployeeDetails.jsx

LeaveManagement.jsx
```

Pages compose multiple reusable components.

---

# 20. layouts/

Application layouts.

Example

```
DashboardLayout.jsx

AuthLayout.jsx
```

---

# 21. hooks/

Contains custom React Hooks.

Example

```
useAuth.js

useEmployees.js

usePagination.js
```

Hooks should encapsulate reusable logic.

---

# 22. services/

Contains frontend business services.

Examples

```
AuthService.js

StorageService.js

NotificationService.js
```

These coordinate frontend behavior and may call API modules.

---

# 23. store/

Contains Zustand stores.

Example

```
authStore.js

themeStore.js
```

Only global application state belongs here.

---

# 24. contexts/

Contains React Context providers when appropriate.

Use Context only when it fits the problem. Prefer Zustand for shared application state.

---

# 25. routes/

Contains routing configuration.

Example

```
AppRoutes.jsx

ProtectedRoute.jsx
```

---

# 26. styles/

Contains global styles.

Example

```
globals.css

variables.css
```

Tailwind remains the primary styling approach.

---

# 27. utils/

Reusable utility functions.

Examples

```
dateFormatter.js

currencyFormatter.js

validators.js
```

Utilities should be pure functions without application state.

---

# 28. constants/

Stores application constants.

Example

```
apiEndpoints.js

roles.js

permissions.js

leaveTypes.js
```

Avoid hardcoding repeated values throughout the application.

---

# 29. File Organization Rules

Create a new file only if it has a clear responsibility.

Avoid dumping unrelated utilities into generic files.

Prefer:

```
EmployeeService.js
```

instead of

```
helpers.js
```

---

# 30. Import Rules

Import from the closest appropriate module.

Avoid circular dependencies.

Group imports in this order:

1. React
2. Third-party libraries
3. Internal modules
4. Components
5. Styles

---

# 31. Naming Standards

Components

```
EmployeeCard.jsx
```

Pages

```
EmployeeList.jsx
```

Hooks

```
useEmployees.js
```

Services

```
EmployeeService.php

AuthService.js
```

Policies

```
EmployeePolicy.php
```

Requests

```
StoreEmployeeRequest.php
```

Resources

```
EmployeeResource.php
```

---

# 32. When to Create a New Folder

Create a new top-level folder only when:

- It has a single clear responsibility.
- Multiple files will belong there.
- Existing folders are no longer appropriate.

Avoid creating folders for a single file without a clear future purpose.

---

# 33. Guiding Principles

The project structure should always promote:

- Discoverability
- Consistency
- Separation of concerns
- Reusability
- Scalability
- Maintainability

When in doubt, place code where another developer would naturally expect to find it. If a file seems to fit in multiple places, reconsider whether its responsibilities should be split.
