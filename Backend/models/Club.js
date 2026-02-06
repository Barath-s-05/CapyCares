const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['academic', 'cultural', 'sports', 'technical', 'social', 'other'],
    required: true
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  membersCount: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  rules: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
clubSchema.index({ name: 1 });
clubSchema.index({ category: 1 });

module.exports = mongoose.model('Club', clubSchema);