# Day 12 - Mobile Recharge Backend API

Complete backend implementation with CRUD operations, JWT authentication, and role-based authorization.

## Features

- **User Management**: Full CRUD operations with role-based access
- **Plan Management**: CRUD operations for recharge plans
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcrypt hashing for password security
- **Role-based Authorization**: Admin and user roles with protected routes
- **Environment Variables**: Secure configuration management

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Update `.env` file with your MongoDB URI and JWT secret
   - Ensure MongoDB is running

3. **Start Server**
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users (Protected Routes)
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Plans
- `GET /api/plans` - Get all plans (Public)
- `GET /api/plans/:id` - Get plan by ID (Public)
- `POST /api/plans` - Create plan (Admin only)
- `PUT /api/plans/:id` - Update plan (Admin only)
- `DELETE /api/plans/:id` - Delete plan (Admin only)

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## User Roles

- **user**: Basic user with limited access
- **admin**: Full access to all operations

## Testing with Postman

1. Register/Login to get JWT token
2. Use token in Authorization header for protected routes
3. Test CRUD operations for users and plans
4. Verify role-based restrictions

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Protected routes middleware
- Environment variable security