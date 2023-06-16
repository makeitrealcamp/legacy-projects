const { Schema, model } = require('mongoose')

const planSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    billing: {
      type: String,
      emun: ['yearly', 'monthly'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Plan = model('Plan', planSchema)

module.exports = Plan
