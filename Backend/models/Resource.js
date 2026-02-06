const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['wellness', 'academic', 'career', 'mental_health', 'study_tips'],
    required: true
  },
  type: {
    type: String,
    enum: ['article', 'video', 'pdf', 'link', 'exercise'],
    required: true
  },
  url: {
    type: String,
    required: function() { 
      return this.type === 'link' || this.type === 'video'; 
    }
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  tags: [{
    type: String
  }],
  duration: {
    type: Number // in minutes for videos/exercises
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
resourceSchema.index({ category: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Resource', resourceSchema);