const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classOfCourse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  classTitle : {
    type: String,
    required: true,
  },
  classDescription: {
    type: String,
    required: true,
  },
  classIsActive:{
    type: Boolean,
    default: true,
  },
  classVideo: {
    type: String,
  },
}, { timestamps: true });

const _Class = mongoose.model('Class', classSchema);

module.exports = _Class;
