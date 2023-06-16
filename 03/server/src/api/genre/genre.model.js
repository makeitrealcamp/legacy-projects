const { Schema, model } = require('mongoose')

const genreSchema = new Schema(
  {
    title: String,
    instrumentation: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Genre = model('Genre', genreSchema)

module.exports = Genre
