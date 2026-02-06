const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/capycares', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Import all models to ensure they're registered
    require('./models/User');
    require('./models/Club');
    require('./models/AcademicRecord');
    require('./models/MoodLog');
    require('./models/FlaggedCase');
    require('./models/ClubMembership');
    require('./models/Resource');
    require('./models/PrivateChat');
    require('./models/CommunityChat');
    require('./models/Notification');
    require('./models/ActivityLog');
    require('./models/WellnessAnalytics');
    
    // Get all models
    const User = mongoose.model('User');
    const Club = mongoose.model('Club');
    const AcademicRecord = mongoose.model('AcademicRecord');
    const MoodLog = mongoose.model('MoodLog');
    const FlaggedCase = mongoose.model('FlaggedCase');
    const ClubMembership = mongoose.model('ClubMembership');
    const Resource = mongoose.model('Resource');
    const PrivateChat = mongoose.model('PrivateChat');
    const CommunityChat = mongoose.model('CommunityChat');
    const Notification = mongoose.model('Notification');
    const ActivityLog = mongoose.model('ActivityLog');
    const WellnessAnalytics = mongoose.model('WellnessAnalytics');
    
    // Clear all collections
    await User.deleteMany({});
    console.log('Cleared Users collection');
    
    await Club.deleteMany({});
    console.log('Cleared Clubs collection');
    
    await AcademicRecord.deleteMany({});
    console.log('Cleared AcademicRecords collection');
    
    await MoodLog.deleteMany({});
    console.log('Cleared MoodLogs collection');
    
    await FlaggedCase.deleteMany({});
    console.log('Cleared FlaggedCases collection');
    
    await ClubMembership.deleteMany({});
    console.log('Cleared ClubMemberships collection');
    
    await Resource.deleteMany({});
    console.log('Cleared Resources collection');
    
    await PrivateChat.deleteMany({});
    console.log('Cleared PrivateChats collection');
    
    await CommunityChat.deleteMany({});
    console.log('Cleared CommunityChats collection');
    
    await Notification.deleteMany({});
    console.log('Cleared Notifications collection');
    
    await ActivityLog.deleteMany({});
    console.log('Cleared ActivityLogs collection');
    
    await WellnessAnalytics.deleteMany({});
    console.log('Cleared WellnessAnalytics collection');
    
    console.log('All database collections cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
});