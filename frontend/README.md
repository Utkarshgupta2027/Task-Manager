# Task Manager

React + Spring Boot + MySQL task management app.

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+

## Setup

### 1. Database

```sql
CREATE DATABASE taskmanager;
CREATE USER 'taskuser'@'localhost' IDENTIFIED BY 'taskpass';
GRANT ALL PRIVILEGES ON taskmanager.* TO 'taskuser'@'localhost';
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Runs on http://localhost:8080

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173

## API Reference

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/tasks     | List all tasks      |
| POST   | /api/tasks     | Create a task       |
| PATCH  | /api/tasks/:id | Update title/status |
| DELETE | /api/tasks/:id | Delete a task       |
