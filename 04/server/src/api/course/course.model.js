const { model, Schema, models } = require('mongoose')

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [60, "maximum length of 60"],
    },
    description: {
      type: String,
      required: false
    },
    language: {
      type: String,
      enum: ['English(US)', 'Spanish(CO)'],
      default: 'English(US)',
      required: false,
    },
    level: {
      type: String,
      enum: ['Beginner level', 'Intermediate level', 'Expert level', 'All levels'],
      required: false
    },
    category: {
      type: String,
      enum: [
        "Development",
        "IT & Software",
        "Design",
        "Marketing",
        "Teaching & Academics",
      ],
      required: false
    },
    primaryTaught: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    video: {
      type: String,
      required: false
    },
    learningObjectives: [{}],
    requirements: [{}],
    intendedLearners: [{}],
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    price: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'USD'
    },
    courseOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseStudents: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
