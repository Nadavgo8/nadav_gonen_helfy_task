Task Manager App
## Backend Setup
1. cd backend
2. npm install
3. npm start (runs on port 4000)
## Frontend Setup
1. cd frontend
2. npm install
3. npm start (runs on port 3000)
## API Endpoints
- GET /api/tasks - Create a new task
- POST POST /api/tasks – Create a new task
- PUT /api/tasks/:id – Update a task
- DELETE /api/tasks/:id – Delete a task
- PATCH /api/tasks/:id/toggle – Toggle task completion status


## Time spent on each part:
- BE - ~ 105 minutes
- FE - ~ 105 minutes
- The remaining 30 minutes were spent on debugging and planning

## Assumptions:
 - Regarding the tasks model can be seen in the code.
 - PUT requests allow partial updates for simplicity
 - Validation is intentionally kept minimal and explicit
