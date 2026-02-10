#!/bin/bash
# CapyCares Easy Deployment Script

echo "🚀 Starting CapyCares Deployment Process..."

# Check if required tools are installed
echo "🔧 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install deployment tools
echo "📦 Installing deployment tools..."
npm install -g vercel @railway/cli

# Prepare backend for deployment
echo "⚙️ Preparing backend..."
cd Backend
npm install

# Create production environment file template
cat > .env.production << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_jwt_secret_here
GROQ_API_KEY=your_groq_api_key_here
EOF

echo "📝 Created .env.production template. Please update with your actual values."

# Go back to root
cd ..

# Prepare frontend for deployment
echo "🎨 Preparing frontend..."
cd Frontend

# Update API base URL for production
echo "🔗 Updating API configuration..."
sed -i 's|http://localhost:5000/api|https://your-backend-url.onrender.com/api|g' script.js

echo "✅ Preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update Backend/.env.production with your actual values"
echo "2. Push code to GitHub"
echo "3. Deploy backend to Render:"
echo "   - Go to render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set environment variables"
echo ""
echo "4. Deploy frontend to Vercel:"
echo "   vercel --prod"
echo ""
echo "5. Update the API URL in the deployed frontend with your actual backend URL"
echo ""
echo "📚 For detailed instructions, check deployment-guide.md"