const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
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
    enum: ['text', 'image', 'file', 'audio'],
    default: 'text'
  },
  isAI: {
    type: Boolean,
    default: false
  },
  sentiment: {
    polarity: { type: Number, min: -1, max: 1 }, // -1 to 1 scale
    emotion: { 
      type: String, 
      enum: ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', null] 
    },
    confidence: { type: Number, min: 0, max: 1 }
  },
  topic: {
    type: String,
    trim: true
  },
  modelVersion: {
    type: String
  },
  readAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ topic: 1 });

module.exports = mongoose.model('PrivateChat', messageSchema);