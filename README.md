# Node.js Practice Project
This repository was created for practical learning of Node.js and backend development.

The project was developed incrementally during the course. Each lesson and homework assignment is stored in a separate Git branch.

## Project Structure
The repository follows a branch-based learning workflow:

- `lessons/lessonX...` — materials and code developed during lesson X.
- `homeworks/hwX...` — homework assignment completed after lesson X.

## Purpose
The goal of this project is to practice and improve skills in:

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Authentication & Authorization
- Email Services
- File Uploads
- Validation
- REST API Development
- Error Handling
- API Documentation (Swagger/OpenAPI)

## Branch Description

### Branch
`homeworks/hw9`

### Topic
1) Cron Jobs
2) Old passwords

### What was implemented
- Restriction on reusing old passwords within 180 days
- Storage of previous password hashes
- Validation of new password against password history
- Enforcement in both password reset and password change flows

## Installation
Clone the repository:

```bash
git clone <repository-url>
cd nodejs_practice
```

Install dependencies:

```bash
npm install
```
Create a .env file in the project root, copy and configure variables from the .env.example.

Run the application in development mode:

```bash
npm run start:dev
```