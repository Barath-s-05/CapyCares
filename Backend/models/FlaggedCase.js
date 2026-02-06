const mongoose = require('mongoose');

const flaggedCaseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moodLog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MoodLog'
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  flaggedAt: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  counselorNotes: {
    type: String,
    trim: true
  },
  contactMethods: [{
    type: {
      type: String,
      enum: ['email', 'phone', 'in-person', 'video-call']
    },
    value: String,
    preferred: {
      type: Boolean,
      default: false
    }
  }],
  caseHistory: [{
    action: {
      type: String,
      enum: ['created', 'updated', 'contacted', 'resolved', 'escalated']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  urgencyScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 1
  },
  automaticReminders: {
    enabled: {
      type: Boolean,
      default: true
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'bi-weekly'],
      default: 'daily'
    },
    lastSent: Date
  }
});

// Indexes
flaggedCaseSchema.index({ student: 1 });
flaggedCaseSchema.index({ resolved: 1, riskLevel: 1 });
flaggedCaseSchema.index({ flaggedAt: -1 });

module.exports = mongoose.model('FlaggedCase', flaggedCaseSchema);