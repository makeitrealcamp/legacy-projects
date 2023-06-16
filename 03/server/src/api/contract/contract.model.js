const { Schema, model } = require('mongoose')

const contractSchema = new Schema(
  {
    contractName: {
      type: String,
      required: true,
      unique: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: Date,
    time: Date,
    price: Number,
    rehearsalPrice: {
      type: Number,
      default: 8,
    },
    recommendations: {
      type: String,
    },
    repertoire: {
      type: [{}],
    },
    rehearsalSchedule: {
      type: [{}],
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    addressInfo: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Contract = model('Contract', contractSchema)

module.exports = Contract
