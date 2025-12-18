# Setup Instructions - Mobile Recharge Application

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)

## Step-by-Step Setup

### 1. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mobile-recharge
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mobile-recharge

# JWT Secret (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=3001

# Environment
NODE_ENV=development
```

#### Start MongoDB
If using local MongoDB:
```bash
# On Windows
net start MongoDB

# On macOS (with Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Start Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:3001`

### 2. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the frontend directory:
```env
# API Base URL
VITE_API_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Mobile Recharge App
VITE_APP_VERSION=1.0.0
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend application will start on `http://localhost:5173`

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. The application will automatically create the database and collections

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` file

### 4. Testing the Setup

#### Backend API Test
```bash
# Test if backend is running
curl http://localhost:3001/api/plans

# Expected response: JSON array of plans
```

#### Frontend Test
1. Open `http://localhost:5173` in your browser
2. You should see the mobile recharge application homepage
3. Try navigating to different pages

### 5. Sample Data (Optional)

To populate your database with sample plans, you can use the following script:

Create `backend/scripts/seedData.js`:
```javascript
const mongoose = require('mongoose');
const Plan = require('../models/Plan');

const samplePlans = [
  {
    type: 'prepaid',
    price: 199,
    validity: '28 days',
    data: '1.5GB/day',
    description: '100 SMS/day, Unlimited calls'
  },
  {
    type: 'prepaid',
    price: 299,
    validity: '28 days',
    data: '2GB/day',
    description: '100 SMS/day, Unlimited calls'
  },
  // Add more plans as needed
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Plan.deleteMany({}); // Clear existing plans
    await Plan.insertMany(samplePlans);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
```

Run the seed script:
```bash
cd backend
node scripts/seedData.js
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 3001
npx kill-port 3001

# Kill process using port 5173
npx kill-port 5173
```

#### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity for Atlas

#### CORS Issues
- Ensure backend CORS is configured for frontend URL
- Check if both servers are running

#### Module Not Found Errors
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Environment-Specific Setup

#### Windows
```bash
# Use PowerShell or Command Prompt
# Ensure Node.js and MongoDB are in PATH
```

#### macOS
```bash
# Install using Homebrew
brew install node mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb
```

## Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure reverse proxy (nginx)
5. Use PM2 for process management

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy `dist` folder to static hosting
3. Update API URL for production

## Next Steps

After successful setup:
1. Explore the application features
2. Test user registration and login
3. Try the recharge functionality
4. Customize the application as needed

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Ensure environment variables are set correctly
4. Check server logs for error messages