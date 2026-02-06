const mongoose = require('mongoose');

const wellnessAnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  metrics: {
    totalUsers: Number,
    activeUsers: Number,
    moodLogs: Number,
    avgMoodScore: Number,
    riskDistribution: {
      low: Number,
      medium: Number,
      high: Number,
      critical: Number
    },
    clubActivity: [{
      club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
      },
      messages: Number,
      activeMembers: Number
    }],
    resourceViews: [{
      resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
      },
      views: Number
    }]
  },
  trends: {
    moodScoreChange: Number,
    userGrowth: Number,
    engagementChange: Number
  }
}, {
  timestamps: true
});

// Indexes
wellnessAnalyticsSchema.index({ date: -1 });

module.exports = mongoose.model('WellnessAnalytics', wellnessAnalyticsSchema);