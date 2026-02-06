const mongoose = require('mongoose');

const communityMessageSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'audio', 'gif', 'poll'],
    default: 'text'
  },
  attachments: [{
    url: String,
    type: String,
    name: String
  }],
  reactions: [{
    emoji: String,
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  poll: {
    question: String,
    options: [{
      text: String,
      votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }],
    isMultipleChoice: Boolean,
    expiresAt: Date
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommunityChat'
  },
  editedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
communityMessageSchema.index({ club: 1, createdAt: -1 });
communityMessageSchema.index({ sender: 1 });
communityMessageSchema.index({ content: 'text' });

module.exports = mongoose.model('CommunityChat', communityMessageSchema);