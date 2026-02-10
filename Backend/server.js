require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/capycares', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CapyCares Backend API' });
});

// Import models to ensure they're registered
require('./models/User');
require('./models/PrivateChat');
require('./models/Club');
require('./models/CommunityChat');
require('./models/MoodLog');
require('./models/FlaggedCase');
require('./models/AcademicRecord');
require('./models/ClubMembership');
require('./models/Notification');
require('./models/ActivityLog');
require('./models/WellnessAnalytics');
require('./models/Resource');

// Test route to check if models are working
app.get('/test-models', async (req, res) => {
  try {
    // Try to access each model
    const User = mongoose.model('User');
    const Club = mongoose.model('Club');
    const MoodLog = mongoose.model('MoodLog');
    
    // Count documents in each collection
    const userCount = await User.countDocuments();
    const clubCount = await Club.countDocuments();
    const moodLogCount = await MoodLog.countDocuments();
    
    res.json({
      message: 'All models loaded successfully',
      counts: {
        users: userCount,
        clubs: clubCount,
        moodLogs: moodLogCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulated Gemini API endpoint
app.post('/api/gemini', (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }
  
  // Simulated response
  const simulatedResponse = {
    "candidates": [
      {
        "content": {
          "parts": [
            {
              "text": `I'm Capy, your AI peer support bot. You asked: "${question}". In a real implementation with a valid API key, I would provide a more detailed response.`
            }
          ]
        }
      }
    ]
  };
  
  res.json(simulatedResponse);
});

// Endpoint to flag messages for counselor review
app.post('/api/flag-message', async (req, res) => {
  try {
    const { sender, keyword, message, count } = req.body;
    
    // Import models
    const FlaggedCase = mongoose.model('FlaggedCase');
    const User = mongoose.model('User');
    const MoodLog = mongoose.model('MoodLog');
    
    // Find the actual user by name
    let user = await User.findOne({ name: sender });
    
    // If user not found, create a temporary user for demo purposes
    // In a real implementation, we would require users to be authenticated
    if (!user) {
      // Check if we have a valid user token to identify the user
      // For now, we'll create a temporary user for demo purposes
      user = new User({
        name: sender || 'Anonymous User',
        email: `${sender?.toLowerCase().replace(/\s+/g, '') || 'anonymous'}@cmrit.ac.in`,
        password: 'simulated_password',
        role: 'student',
        branch: 'CSE',
        section: 'A',
        semester: 4
      });
      await user.save();
    }
    
    // Determine risk level based on keyword count
    let riskLevel = 'low';
    if (count > 10) {
      riskLevel = 'critical';
    } else if (count > 7) {
      riskLevel = 'high';
    } else if (count > 4) {
      riskLevel = 'medium';
    }
    
    // Create a mood log entry
    const moodLog = new MoodLog({
      student: user._id,
      moodType: 'sad',
      moodScore: 3, // Low score for concerning messages
      messageExtract: message.substring(0, 100),
      severityScore: count, // Use count as severity indicator
      riskLevel: riskLevel,
      flaggedByModel: true,
      triggers: ['health']
    });
    await moodLog.save();
    
    // Create or update flagged case
    const existingCase = await FlaggedCase.findOne({ student: user._id, resolved: false });
    
    if (existingCase) {
      // Update existing case
      existingCase.reason = `Repeated mentions of "${keyword}" (${count} times)`;
      existingCase.riskLevel = riskLevel;
      existingCase.urgencyScore = Math.min(count, 10);
      existingCase.caseHistory.push({
        action: 'updated',
        notes: `Keyword "${keyword}" mentioned ${count} times in message: ${message.substring(0, 50)}...`
      });
      await existingCase.save();
    } else {
      // Create new flagged case
      const flaggedCase = new FlaggedCase({
        student: user._id,
        moodLog: moodLog._id,
        reason: `Repeated mentions of "${keyword}" (${count} times)`,
        riskLevel: riskLevel,
        urgencyScore: Math.min(count, 10)
      });
      await flaggedCase.save();
    }
    
    res.json({ 
      success: true, 
      message: 'Message flagged for counselor review',
      riskLevel: riskLevel
    });
  } catch (error) {
    console.error('Error flagging message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to flag message for review' 
    });
  }
});

// Admin login endpoint
app.post('/api/auth/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }
    
    // Validate email domain
    if (!email.endsWith('@cmrit.ac.in')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please use a valid @cmrit.ac.in email address' 
      });
    }
    
    // Import User model
    const User = mongoose.model('User');
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Check if user is an admin or counselor
    if (user.role !== 'admin' && user.role !== 'counselor') {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Validate password using bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Generate a simple token (in a real implementation, use JWT)
    const token = `${user.role}-${user._id}-${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed. Please try again.' 
    });
  }
});

// Admin signup endpoint
app.post('/api/auth/admin/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    
    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }
    
    // Validate email domain
    if (!email.endsWith('@cmrit.ac.in')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please use a valid @cmrit.ac.in email address' 
      });
    }
    
    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 8 characters long' 
      });
    }
    
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must contain at least one uppercase letter' 
      });
    }
    
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must contain at least one number' 
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Passwords do not match' 
      });
    }
    
    // Import User model
    const User = mongoose.model('User');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'An account with this email already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new admin user (pending approval)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin', // Default to admin, but in real implementation would need approval
    });
    
    await user.save();
    
    // Generate a simple token (in a real implementation, use JWT)
    const token = `admin-${user._id}-${Date.now()}`;
    
    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during admin signup:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Signup failed. Please try again.' 
    });
  }
});

// Endpoint to get flagged cases for counselor dashboard
app.get('/api/flagged-cases', async (req, res) => {
  try {
    const FlaggedCase = mongoose.model('FlaggedCase');
    const User = mongoose.model('User');
    
    // Get all unresolved flagged cases
    const flaggedCases = await FlaggedCase.find({ resolved: false })
      .populate('student', 'name email')
      .sort({ flaggedAt: -1 })
      .limit(20);
    
    res.json({
      success: true,
      cases: flaggedCases
    });
  } catch (error) {
    console.error('Error fetching flagged cases:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch flagged cases' 
    });
  }
});

// Student login endpoint
app.post('/api/auth/student/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }
    
    // Validate email domain
    if (!email.endsWith('@cmrit.ac.in')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please use a valid @cmrit.ac.in email address' 
      });
    }
    
    // Import User model
    const User = mongoose.model('User');
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Check if user is a student
    if (user.role !== 'student') {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Validate password using bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Generate a simple token (in a real implementation, use JWT)
    const token = `student-${user._id}-${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed. Please try again.' 
    });
  }
});

// Student signup endpoint
app.post('/api/auth/student/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const { name, email, password, confirmPassword } = req.body;
    
    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }
    
    // Validate email domain
    if (!email.endsWith('@cmrit.ac.in')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please use a valid @cmrit.ac.in email address' 
      });
    }
    
    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 8 characters long' 
      });
    }
    
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must contain at least one uppercase letter' 
      });
    }
    
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must contain at least one number' 
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Passwords do not match' 
      });
    }
    
    // Import User model
    const User = mongoose.model('User');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'An account with this email already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user with default values for student-specific fields
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      branch: req.body.branch || 'CSE', // Use provided value or default to 'CSE'
      section: req.body.section || 'A', // Use provided value or default to 'A'
      semester: req.body.semester || 1 // Use provided value or default to 1
    });
    
    await user.save();
    
    // Generate a simple token (in a real implementation, use JWT)
    const token = `student-${user._id}-${Date.now()}`;
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during student signup:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Signup failed. Please try again.' 
    });
  }
});
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are Capy, a warm, empathetic student mental health peer support listener. You are not a doctor. Encourage seeking help if user expresses severe distress."

        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("Groq Error:", err);
    res.status(500).json({ error: "Groq failed" });
  }
});
console.log("Groq Key Loaded:", process.env.GROQ_API_KEY ? "YES" : "NO");


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'capycares-backend'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
