const Genre = require('./genre.model')

function createGenre(genre) {
  return Genre.create(genre)
}

function getAllGenres() {
  return Genre.find({})
}

function getOneGenre(genre) {
  return Genre.findOne({ title: genre })
}

function updateGenre(id, genre) {
  return Genre.findByIdAndUpdate(id, genre, { new: true })
}

function deleteGenre(id) {
  return Genre.findByIdAndRemove(id)
}

module.exports = {
  createGenre,
  getAllGenres,
  getOneGenre,
  updateGenre,
  deleteGenre,
}
