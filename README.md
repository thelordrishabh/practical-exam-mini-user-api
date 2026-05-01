# Mini User API (Practical Exam Task)

Simple Node.js + Express backend API that demonstrates:
- Routing
- Middleware
- Basic authentication
- Input validation and error handling

## Tech Stack
- Node.js
- Express

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start server:
   ```bash
   npm start
   ```
3. Server runs at:
   - `http://localhost:3000`

## Implemented Routes

### Health Check
- `GET /`
  - Response: `"Server Running"`

### Users
- `GET /users`
  - Returns all users

- `POST /users`
  - Body:
    ```json
    {
      "name": "Sample Name",
      "email": "sample@email.com"
    }
    ```
  - Validations:
    - `name` and `email` are required
    - duplicate emails are not allowed

- `DELETE /users/:id`
  - Deletes a user by `id`
  - If not found: `"User not found"`

- `GET /users/:id` (Bonus)
  - Returns a specific user by `id`
  - If not found: `"User not found"`

### Login
- `POST /login`
  - Body:
    ```json
    {
      "email": "admin@gmail.com",
      "password": "1234"
    }
    ```
  - Cases:
    - missing fields -> `"All fields required"`
    - wrong credentials -> `"Invalid Credentials"`
    - correct credentials -> `"Login Success"`

## Middleware
Custom middleware runs on every request and logs:
- `Request received at: CURRENT_TIME`
- request method + URL (example: `GET /users`)

## Response Format
All responses are JSON and include:
```json
{
  "message": "Operation successful",
  "time": "current time"
}
```

## Quick API Test Commands (curl)

```bash
# 1) Root route
curl -s http://localhost:3000/

# 2) Login success
curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"1234"}'

# 3) Login invalid
curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"wrong"}'

# 4) Add user
curl -s -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample Name","email":"sample@email.com"}'

# 5) Duplicate email check
curl -s -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Another Name","email":"sample@email.com"}'

# 6) Get all users
curl -s http://localhost:3000/users

# 7) Get user by id (bonus)
curl -s http://localhost:3000/users/1

# 8) Delete user by id
curl -s -X DELETE http://localhost:3000/users/1
```

## Viva Questions (with short answers)

1. **Why do we use `express.json()`?**  
   To parse incoming JSON request bodies into `req.body`.

2. **What is middleware in Express?**  
   A function that runs during the request-response cycle and can modify `req`, `res`, or call `next()`.

3. **Why did we add a custom logger middleware?**  
   To track every request time, method, and URL for debugging and monitoring.

4. **Why do we return proper status codes (400, 401, 404, 409, etc.)?**  
   They communicate the exact result type to the client and improve API correctness.

5. **How is duplicate email prevented here?**  
   By searching existing users before insertion and rejecting if email already exists.

6. **Is this authentication secure for production? Why/why not?**  
   No. Credentials are hardcoded and no token/session system is used.

7. **Why do we include a `time` field in every response?**  
   It helps trace when requests were handled and improves observability.

8. **Why is in-memory array storage limited?**  
   Data is lost on server restart and does not scale like a database.

9. **Difference between `PUT` and `PATCH` (conceptually)?**  
   `PUT` usually replaces a full resource; `PATCH` partially updates fields.

10. **What are two common production improvements for this API?**  
    Add database persistence and implement JWT/session-based auth with password hashing.
