const mongoose = require('mongoose');

// Your MongoDB connection string
const uri = 'mongodb+srv://barath_db:SBarath05@capycares-user.tigkqjd.mongodb.net/capycares?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  mongoose.connection.close();
})
.catch(err => {
  console.error('❌ MongoDB connection error:');
  console.error('Error details:', err);
  
  // Common error codes
  if (err.message.includes('authentication failed')) {
    console.log('\n🔍 Authentication troubleshooting:');
    console.log('1. Double-check your username and password in MongoDB Atlas');
    console.log('2. Make sure your user has proper permissions for the database');
    console.log('3. Ensure your password is properly URL-encoded if it contains special characters');
    console.log('4. Check if the user has "read and write to any database" privilege');
  }
  
  if (err.message.includes('HostNotFound') || err.message.includes('EAI_AGAIN')) {
    console.log('\n🌍 DNS/connection troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Make sure there are no network/firewall blocking requests to Atlas');
    console.log('3. Your MongoDB Atlas cluster needs to be configured correctly in their website.');
    setTimeout(() => process.exit(1), 1000);
  }
});