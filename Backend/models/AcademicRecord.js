const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  subjects: [{
    name: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    attendance: {
      type: Number,
      min: 0,
      max: 100
    },
    attendancePercentage: {
      type: Number,
      min: 0,
      max: 100
    },
    internalMarks: {
      type: Number,
      min: 0
    },
    assignments: [{
      name: String,
      marks: Number,
      maxMarks: Number,
      submittedAt: Date,
      graded: Boolean
    }],
    assessments: [{
      name: String,
      marks: Number,
      maxMarks: Number,
      date: Date
    }],
    grade: {
      type: String,
      enum: ['O', 'A+', 'A', 'B+', 'B', 'C', 'F', 'AB', 'I']
    },
    facultyName: {
      type: String
    },
    credits: {
      type: Number
    },
    labHours: {
      type: Number
    },
    theoryHours: {
      type: Number
    }
  }],
  sgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  totalCredits: {
    type: Number
  }
}, {
  timestamps: true
});

// Indexes
academicRecordSchema.index({ student: 1, semester: -1 });
academicRecordSchema.index({ 'subjects.name': 1 });

module.exports = mongoose.model('AcademicRecord', academicRecordSchema);