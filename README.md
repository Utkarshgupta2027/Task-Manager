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
| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/tasks       | List all tasks     |
| POST   | /api/tasks       | Create a task      |
| PATCH  | /api/tasks/:id   | Update title/status|
| DELETE | /api/tasks/:id   | Delete a task      |

## Render Deployment

This repo includes Dockerfiles for both services and a `render.yaml` blueprint.

### Required environment variables

Backend service:
```bash
DB_URL=jdbc:mysql://<mysql-host>:3306/<database-name>?useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=<mysql-user>
DB_PASSWORD=<mysql-password>
CORS_ALLOWED_ORIGINS=https://<frontend-service>.onrender.com
JPA_SHOW_SQL=false
```

Frontend service:
```bash
VITE_API_URL=https://<backend-service>.onrender.com
```

### Deploy order

1. Push this repository to GitHub.
2. Create or connect a MySQL database. On Render, use their MySQL template/private service, or use any external MySQL host.
3. In Render, create a Blueprint from this repo. Render will read `render.yaml` and create `task-manager-api` and `task-manager-frontend`.
4. Fill the backend environment variables. Use `/api/health` as the backend health check path.
5. Deploy the backend first and copy its public URL.
6. Set the frontend `VITE_API_URL` to the backend URL, for example `https://task-manager-api.onrender.com`.
7. Deploy the frontend and copy its public URL.
8. Update the backend `CORS_ALLOWED_ORIGINS` to the frontend URL, for example `https://task-manager-frontend.onrender.com`, then redeploy the backend.
