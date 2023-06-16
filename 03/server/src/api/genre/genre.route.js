const express = require('express')
const {
  createGenrehandler,
  getAllGenresHandler,
  getOneGenreHandler,
  updateGenreHandler,
  deleteGenreHandler,
} = require('./genre.controller')

const router = express.Router()

router.post('/', createGenrehandler)
router.get('/', getAllGenresHandler)
router.post('/:genreId', getOneGenreHandler)
router.put('/:genreId', updateGenreHandler)
router.delete('/:genreId', deleteGenreHandler)

module.exports = router
