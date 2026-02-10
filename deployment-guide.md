# CapyCares Deployment Guide

## 📋 Pre-deployment Checklist

### 1. Environment Variables
Create a `.env.production` file in your Backend folder:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

### 2. Update API Base URLs
In `Frontend/script.js`, update the API base URL:

```javascript
// For production
const API_BASE = 'https://your-backend-url.onrender.com/api';

// For development (keep as is)
// const API_BASE = 'http://localhost:5000/api';
```

### 3. Database Setup
- Create MongoDB Atlas cluster (free tier available)
- Update connection string in environment variables
- Run seed script to populate initial data

### 4. Security Updates
- Generate strong JWT secret
- Enable CORS for your frontend domain
- Add rate limiting
- Implement proper error handling

## 🚀 Deployment Steps

### Option 1: Vercel + Render (Recommended)

#### Backend (Render):
1. Push code to GitHub
2. Create Render account
3. Deploy as Web Service
4. Set environment variables
5. Get the deployed URL

#### Frontend (Vercel):
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to Frontend folder
3. Run: `vercel --prod`
4. Update API URLs in deployed app

### Option 2: Railway (All-in-one)

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

### Option 3: Manual Deployment

#### Backend:
```bash
# On your server/VPS
git clone your-repo-url
cd Backend
npm install
npm start
```

#### Frontend:
```bash
# Serve static files using nginx/apache
# Or use services like Netlify/Vercel
```

## 🔧 Post-deployment

1. Test all authentication flows
2. Verify chat functionality
3. Check database connections
4. Monitor logs for errors
5. Set up monitoring/alerts

## 📊 Monitoring

- Set up uptime monitoring (UptimeRobot)
- Configure error tracking (Sentry)
- Monitor performance metrics
- Set up alerts for critical issues

## 🔄 CI/CD Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CapyCares
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          cd Frontend
          # Vercel deployment commands

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Render deployment via API
```

## 💡 Tips for Success

1. **Start with staging environment** before production
2. **Test thoroughly** with real user scenarios
3. **Monitor performance** and optimize as needed
4. **Backup your database** regularly
5. **Keep dependencies updated**
6. **Implement proper logging**
7. **Set up automated backups**

## 🆘 Troubleshooting

Common issues and solutions:
- CORS errors: Update allowed origins
- Database connection: Check connection string
- API timeouts: Optimize queries
- Memory issues: Monitor usage and scale