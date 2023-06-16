const Router = require('express')
const {
  signInHandle,
  signUpHandle,
  updatePhotoshandler,
  updateUserDataHandler,
  oneUserHandler,
  dataOfUserHandler,
  allArtistsUserHandler,
  filteredArtistHandler,
  updateRegularDataHandler,
  thirdPartAuthenticatio,
  allArtistsHandler,
  updateAvatarHandler,
} = require('./user.controller')
const { formData } = require('../../utils/formData')
const { authenticate } = require('../../utils/auth')

const router = Router()

router.post('/auth0', thirdPartAuthenticatio)
router.post('/signup', signUpHandle)
router.post('/signin', signInHandle)
router.post('/update/form-data', authenticate, formData, updatePhotoshandler)
router.post('/update-avatar', authenticate, formData, updateAvatarHandler)
router.put('/update-regular', authenticate, updateRegularDataHandler)
router.put('/update', authenticate, updateUserDataHandler)
router.get('/datauser', authenticate, dataOfUserHandler)
router.get('/artist-recomended-data', allArtistsUserHandler)
router.get('/artist-recomended', allArtistsHandler)
router.get('/artist-initial-data', allArtistsUserHandler)
router.get('/artist-email/:email', oneUserHandler)
router.get('/filtered-artists', filteredArtistHandler)

module.exports = router
