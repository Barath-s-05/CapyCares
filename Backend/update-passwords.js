const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Hash the known passwords
const adminHash = bcrypt.hashSync('Admin123', 12);
const counselorHash = bcrypt.hashSync('Counselor123', 12);
const studentHash = bcrypt.hashSync('Student123', 12);

console.log('Admin hash:', adminHash);
console.log('Counselor hash:', counselorHash);
console.log('Student hash:', studentHash);

// Read the existing users.json
const usersPath = path.join(__dirname, 'seed', 'users.json');
const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// Update the passwords
usersData.forEach(user => {
    if (user.email === 'admin@cmrit.ac.in') {
        user.password = adminHash;
    } else if (user.email === 'priya.counselor@cmrit.ac.in') {
        user.password = counselorHash;
    } else {
        // For student accounts, use student hash
        user.password = studentHash;
    }
});

// Write back to file
fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2));
console.log('Updated users.json with correct password hashes');