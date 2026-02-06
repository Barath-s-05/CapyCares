const mongoose = require('mongoose');

const clubMembershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  role: {
    type: String,
    enum: ['member', 'admin', 'moderator'],
    default: 'member'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  leftAt: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  }
});

// Indexes
clubMembershipSchema.index({ user: 1, club: 1 }, { unique: true });
clubMembershipSchema.index({ club: 1, isActive: 1 });
clubMembershipSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('ClubMembership', clubMembershipSchema);