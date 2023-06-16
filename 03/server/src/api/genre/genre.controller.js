const {
  createGenre,
  getAllGenres,
  getOneGenre,
  updateGenre,
  deleteGenre,
} = require('./genre.service')

async function createGenrehandler(req, res) {
  const data = req.body
  try {
    const genre = await createGenre(data)
    return res.status(201).json({ message: 'Genre created', data: genre })
  } catch (e) {
    res.status(400).json({ message: 'Genre not created', error: e })
  }
}

async function getAllGenresHandler(_, res) {
  try {
    const genres = await getAllGenres()
    return res.status(200).json({ message: 'Genres found', data: genres })
  } catch (e) {
    res.status(400).json({ message: 'Genres not found', error: e })
  }
}

async function getOneGenreHandler(req, res) {
  const data = req.body
  try {
    const genre = await getOneGenre(data.title)
    return res.status(200).json({ message: 'Genre found', data: genre })
  } catch (e) {
    res.status(400).json({ message: 'Genre not found', error: e })
  }
}

async function updateGenreHandler(req, res) {
  const { genreId } = req.params
  const data = req.body
  try {
    const genre = await updateGenre(genreId, data)
    return res.status(200).json({ message: 'Genre updated', data: genre })
  } catch (e) {
    res.status(400).json({ message: 'Genre not updated', error: e })
  }
}

async function deleteGenreHandler(req, res) {
  const { genreId } = req.params
  try {
    const genre = await deleteGenre(genreId)
    return res.status(200).json({ message: 'Genre deleted', data: genre })
  } catch (e) {
    res.status(400).json({ message: 'Genre not updated', error: e })
  }
}

module.exports = {
  createGenrehandler,
  getAllGenresHandler,
  getOneGenreHandler,
  updateGenreHandler,
  deleteGenreHandler,
}
