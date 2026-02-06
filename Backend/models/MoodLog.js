const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moodType: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'angry', 'neutral', 'excited', 'tired', 'stressed'],
    required: true
  },
  moodScore: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  messageExtract: {
    type: String,
    required: true,
    trim: true
  },
  severityScore: {
    type: Number,
    min: 0,
    max: 10
  },
  moodTrend: {
    type: String,
    enum: ['improving', 'declining', 'stable', 'volatile']
  },
  dailyAverage: {
    type: Number,
    min: 1,
    max: 10
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  flaggedByModel: {
    type: Boolean,
    default: false
  },
  modelVersion: {
    type: String
  },
  triggers: [{
    type: String,
    enum: ['academic', 'social', 'family', 'health', 'other']
  }],
  copingStrategies: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes
moodLogSchema.index({ student: 1, createdAt: -1 });
moodLogSchema.index({ riskLevel: 1 });
moodLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('MoodLog', moodLogSchema);