# Mobile Recharge Application - Final Integrated Project

A complete full-stack mobile recharge web application with React frontend and Node.js backend.

## Project Structure

```
final-project/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── README.md         # This file
└── setup.md          # Setup instructions
```

## Features

### Frontend (React + Vite)
- Modern React application with Vite
- Tailwind CSS for styling
- Context API for state management
- Form validation with Yup/Zod
- Responsive design
- Authentication flow
- Plan selection and recharge functionality

### Backend (Node.js + Express)
- RESTful API with Express.js
- MongoDB integration with Mongoose
- JWT authentication
- CORS enabled
- User management
- Plan management
- Secure password hashing

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Context API
- Yup/Zod validation

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd final-project
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get plan by ID

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/mobile-recharge
JWT_SECRET=your-secret-key
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

## Development

### Backend Development
```bash
cd backend
npm run dev    # Start with nodemon
npm start      # Start production
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
```

## Production Deployment

### Backend
1. Set production environment variables
2. Build and deploy to your server
3. Ensure MongoDB is accessible

### Frontend
1. Update API URL in environment variables
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [your-email@example.com]