# Render Deployment Guide

## Quick Deploy

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Render"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repo
   - Select `day13` folder
   - Deploy using `render.yaml`

## Manual Setup Alternative

### Backend Service
- **Type**: Web Service
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `JWT_SECRET=<generate-random>`
  - `JWT_EXPIRE=7d`
  - `MONGODB_URI=<your-mongodb-atlas-uri>`

### Frontend Service
- **Type**: Static Site
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**:
  - `VITE_API_URL=https://your-backend-url.onrender.com`

### Database
- Create MongoDB Atlas cluster
- Get connection string
- Add to backend environment variables

## URLs After Deployment
- Backend: `https://mobz-backend.onrender.com`
- Frontend: `https://mobz-frontend.onrender.com`