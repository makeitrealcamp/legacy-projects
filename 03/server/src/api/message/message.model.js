const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

messageSchema.plugin(mongoosePaginate)
const Message = model('Message', messageSchema)

module.exports = Message
