# PeopleFlow HRMS – Git Workflow

**Version:** 1.0
**Status:** Active

---

# 1. Purpose

This document defines the Git branching strategy, commit conventions, merge process, and release workflow for PeopleFlow HRMS.

The goals are to:

- Maintain a clean Git history.
- Keep the main branch stable.
- Isolate feature development.
- Make changes easy to review.
- Simulate a professional team workflow.

Although PeopleFlow HRMS is currently a solo project, the workflow is designed to reflect practices commonly used in software teams.

---

# 2. Branching Strategy

The project uses a simplified Git Flow model.

```
main
  │
  └──────────────┐
                 │
             develop
                 │
        ┌────────┴────────┐
        │                 │
feature/authentication
feature/employees
feature/attendance
feature/payroll
feature/dashboard
```

---

# 3. Branch Responsibilities

## main

Purpose

- Production-ready code.
- Stable releases only.

Rules

- Never develop directly on `main`.
- Every commit on `main` should represent a tested milestone.
- `main` should always be deployable.

---

## develop

Purpose

- Integration branch.
- Contains completed features waiting for the next stable release.

Rules

- All feature branches merge into `develop`.
- Keep `develop` functional at all times.

---

## feature/\*

Purpose

Each new feature is developed in its own branch.

Examples

```
feature/authentication

feature/dashboard

feature/employee-management

feature/leave-management

feature/payroll

feature/recruitment
```

Rules

- One branch per feature.
- Do not mix unrelated work.
- Merge into `develop` only after testing.

---

## bugfix/\*

Purpose

Fix issues found during development.

Examples

```
bugfix/login-validation

bugfix/attendance-report

bugfix/profile-image-upload
```

---

## hotfix/\*

Purpose

Urgent fixes for issues already present in the `main` branch.

Example

```
hotfix/security-patch

hotfix/token-expiration
```

These branches should be rare.

---

# 4. Development Workflow

Every new feature follows this sequence.

```
develop

↓

Create Feature Branch

↓

Implement Feature

↓

Test

↓

Commit

↓

Push

↓

Merge into develop

↓

Delete Feature Branch
```

---

# 5. Starting a New Feature

Update the local repository.

```bash
git checkout develop

git pull origin develop
```

Create a feature branch.

```bash
git checkout -b feature/authentication
```

Work on the feature.

Commit changes regularly.

Push the branch.

```bash
git push -u origin feature/authentication
```

---

# 6. Merging a Feature

After testing:

```
feature/authentication

↓

Merge

↓

develop
```

Delete the feature branch after a successful merge.

```bash
git branch -d feature/authentication
```

Optionally remove the remote branch.

```bash
git push origin --delete feature/authentication
```

---

# 7. Release Workflow

When several features have been completed and tested:

```
develop

↓

Final Testing

↓

Merge

↓

main

↓

Tag Release
```

Example

```bash
git checkout main

git merge develop

git push origin main
```

---

# 8. Commit Message Convention

PeopleFlow HRMS follows the Conventional Commits specification.

Format

```
type(scope): short description
```

---

## Feature

```
feat(auth): implement JWT login

feat(employee): create employee CRUD

feat(payroll): generate monthly payslips
```

---

## Bug Fix

```
fix(auth): resolve invalid token issue

fix(employee): prevent duplicate email addresses
```

---

## Documentation

```
docs: add project overview

docs(api): update authentication endpoints
```

---

## Refactoring

```
refactor(employee): simplify onboarding workflow
```

---

## Styling

```
style: apply Laravel Pint formatting

style(frontend): format React components
```

---

## Tests

```
test(employee): add feature tests

test(auth): improve login coverage
```

---

## Chore

```
chore: configure ESLint

chore: update dependencies
```

---

# 9. Commit Best Practices

Each commit should:

- Represent one logical change.
- Build successfully.
- Avoid unrelated modifications.
- Have a meaningful description.

Avoid commits such as:

```
update

changes

fix

work

test

asdf
```

---

# 10. Commit Frequency

Commit regularly.

Recommended milestones include:

- After completing a backend endpoint.
- After finishing a frontend page.
- After implementing a database migration.
- After completing a reusable component.
- After updating documentation.

Avoid committing incomplete or broken functionality.

---

# 11. Pull Requests

Even as a solo developer, treat every feature as if it requires a pull request.

Before merging, ask:

- Does the feature meet the requirements?
- Is the code readable?
- Does it follow project standards?
- Has it been tested?
- Does it introduce unnecessary complexity?
- Is the documentation updated if required?

This review mindset helps catch issues before they become technical debt.

---

# 12. Merge Strategy

Use merge commits to preserve feature history.

Avoid squashing all feature commits into one unless there is a clear reason to do so.

---

# 13. Git Tags

Tag stable milestones.

Examples

```
v1.0.0

v1.1.0

v1.2.0
```

Example command

```bash
git tag v1.0.0

git push origin v1.0.0
```

---

# 14. .gitignore

Never commit:

```
.env

vendor/

node_modules/

storage/logs/

public/storage (generated)

*.log

.idea/

.vscode/

.DS_Store
```

Commit:

```
.env.example
```

---

# 15. Recovery Practices

Before starting work each day:

```bash
git checkout develop

git pull origin develop
```

Create a fresh feature branch.

Never continue unrelated work in an old feature branch.

---

# 16. Release Checklist

Before merging `develop` into `main`:

- All planned features are complete.
- Application builds successfully.
- Backend tests pass.
- Frontend functions correctly.
- Database migrations run successfully.
- Documentation is up to date.
- No debugging code remains.
- No sensitive information has been committed.

---

# 17. Daily Workflow

```
Start Day

↓

Pull develop

↓

Create Feature Branch

↓

Develop

↓

Test

↓

Commit

↓

Push

↓

Review

↓

Merge into develop

↓

Delete Feature Branch

↓

End Day
```

---

# 18. Git Philosophy

The Git history should tell the story of the project.

Every commit should answer:

- What changed?
- Why did it change?

A clean commit history makes debugging, reviewing, and understanding the evolution of the project significantly easier.
