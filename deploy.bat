@echo off
title CapyCares Deployment Assistant
echo 🚀 Starting CapyCares Deployment Process...
echo.

REM Check if Node.js is installed
echo 🔧 Checking prerequisites...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install deployment tools
echo 📦 Installing deployment tools...
npm install -g vercel @railway/cli

REM Prepare backend for deployment
echo ⚙️ Preparing backend...
cd Backend
npm install

REM Create production environment file template
echo NODE_ENV=production > .env.production
echo PORT=5000 >> .env.production
echo MONGODB_URI=your_mongodb_atlas_connection_string >> .env.production
echo JWT_SECRET=your_secure_random_jwt_secret_here >> .env.production
echo GROQ_API_KEY=your_groq_api_key_here >> .env.production

echo 📝 Created .env.production template. Please update with your actual values.

REM Go back to root
cd ..

REM Prepare frontend for deployment
echo 🎨 Preparing frontend...
cd Frontend

echo ✅ Preparation complete!
echo.
echo 📋 Next Steps:
echo 1. Update Backend/.env.production with your actual values
echo 2. Push code to GitHub
echo 3. Deploy backend to Render:
echo    - Go to render.com
echo    - Create new Web Service
echo    - Connect your GitHub repo
echo    - Set environment variables from .env.production
echo.
echo 4. Deploy frontend to Vercel:
echo    vercel --prod
echo.
echo 5. Update the API URL in the deployed frontend with your actual backend URL
echo.
echo 📚 For detailed instructions, check deployment-guide.md
echo.
pause