const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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
    // Import all models
    require('./models/User');
    require('./models/Club');
    require('./models/AcademicRecord');
    require('./models/MoodLog');
    require('./models/FlaggedCase');
    require('./models/ClubMembership');
    require('./models/Resource');
    
    // Get models
    const User = mongoose.model('User');
    const Club = mongoose.model('Club');
    const AcademicRecord = mongoose.model('AcademicRecord');
    const MoodLog = mongoose.model('MoodLog');
    const FlaggedCase = mongoose.model('FlaggedCase');
    const ClubMembership = mongoose.model('ClubMembership');
    const Resource = mongoose.model('Resource');
    
    // Clear existing data
    await User.deleteMany({});
    await Club.deleteMany({});
    await AcademicRecord.deleteMany({});
    await MoodLog.deleteMany({});
    await FlaggedCase.deleteMany({});
    await ClubMembership.deleteMany({});
    await Resource.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Read seed data
    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'users.json'), 'utf8'));
    const clubsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'clubs.json'), 'utf8'));
    const academicRecordsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'academicRecords.json'), 'utf8'));
    const moodLogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'moodLogs.json'), 'utf8'));
    const flaggedCasesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'flaggedCases.json'), 'utf8'));
    const clubMembershipsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'clubMemberships.json'), 'utf8'));
    const resourcesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'resources.json'), 'utf8'));
    
    // Insert data
    await User.insertMany(usersData);
    console.log('Seeded Users');
    
    await Club.insertMany(clubsData);
    console.log('Seeded Clubs');
    
    await AcademicRecord.insertMany(academicRecordsData);
    console.log('Seeded Academic Records');
    
    await MoodLog.insertMany(moodLogsData);
    console.log('Seeded Mood Logs');
    
    await FlaggedCase.insertMany(flaggedCasesData);
    console.log('Seeded Flagged Cases');
    
    await ClubMembership.insertMany(clubMembershipsData);
    console.log('Seeded Club Memberships');
    
    await Resource.insertMany(resourcesData);
    console.log('Seeded Resources');
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});