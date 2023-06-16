const {
  signIn,
  signUp,
  oneUser,
  updateUserPhotos,
  filteredArtist,
  dataOfUser,
  updateUserData,
  updateRegularData,
  allArtistsUser,
  allArtists,
  updateAvatar,
} = require('./user.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { transporter, welcome } = require('../../utils/mailer')

async function dataOfUserHandler(req, res) {
  try {
    const id = req.user
    const user = await dataOfUser(id)
    return res.status(200).json({ message: 'User found', data: user })
  } catch (e) {
    return res.status(400).json({ message: 'User not found', data: e })
  }
}

const signUpHandle = async (req, res) => {
  const userData = req.body
  try {
    const encPassword = await bcrypt.hash(userData.password, 10)
    const user = await signUp(userData, encPassword)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60000,
    })
    await transporter.sendMail(welcome(user))
    return res.status(201).json({
      message: 'User created successfully',
      data: {
        email: user.email,
        token,
        name: user.name,
        imagesDone: user.imagesDone,
      },
    })
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not be created', error: err })
  }
}

const signInHandle = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await signIn(email)
    if (!user) {
      throw new Error('Some of your credentials are invalid')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Some of your credentials are invalid')
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60000,
    })
    if (user.mode === 'customer') {
      return res.status(200).json({
        message: 'Login successfully',
        data: {
          token,
          email: user.email,
          name: user.name,
          imagesDone: user.imagesDone,
          mode: user.mode,
        },
      })
    } else {
      return res.status(200).json({
        message: 'Login successfully',
        data: {
          token,
          email: user.email,
          name: user.name,
          imagesDone: user.imagesDone,
          skills: user.skills,
          location: user.location,
          mode: user.mode,
          city: user.city,
        },
      })
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not login', error: err.message })
  }
}

const updatePhotoshandler = async (req, res) => {
  const userData = req.body
  try {
    const userUpdated = await updateUserPhotos(userData)
    return res.status(200).json({ message: 'User updated', data: userUpdated })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not be update', data: e })
  }
}

const updateUserDataHandler = async (req, res) => {
  const userId = req.user
  const userData = req.body
  try {
    const user = await updateUserData(userId, userData)
    return res.status(200).json({
      message: 'User updated',
      data: {
        mode: user.mode,
        city: user.city,
        location: user.location,
        skills: user.skills,
        favoriteGenres: user.favoriteGenres,
      },
    })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not be update', data: e })
  }
}

async function allArtistsUserHandler(req, res) {
  const { limit, page } = req.query
  try {
    const artists = await allArtistsUser(limit, page)
    return res.status(200).json({ message: 'Arists found', data: artists })
  } catch (e) {
    return res.status(400).json({ message: 'Arists found', data: e })
  }
}

async function oneUserHandler(req, res) {
  const { email } = req.params
  try {
    const user = await oneUser(email)
    return res.status(200).json({ message: 'User Found', data: user })
  } catch (e) {
    return res.status(400).json({ message: 'User not Found', data: e })
  }
}

async function filteredArtistHandler(req, res) {
  const { city, limit, page, price, instrument, genre } = req.query
  try {
    const artists = await filteredArtist(city, limit, page, instrument, genre)
    const priceParsed = JSON.parse(price)
    if (priceParsed[0] > 0 && priceParsed[1] > 0) {
      const byPrice = artists.docs.filter(
        (artist) =>
          artist.price >= priceParsed[0] && artist.price <= priceParsed[1]
      )
      return res
        .status(200)
        .json({ message: 'Artist found', data: { docs: byPrice } })
    } else {
      return res.status(200).json({ message: 'Artist found', data: artists })
    }
  } catch (e) {
    return res.status(400).json({ message: 'Artists not found', data: e })
  }
}

async function thirdPartAuthenticatio(req, res) {
  const { email, name } = req.body
  try {
    const exitingUser = await signIn(email)
    if (!exitingUser) {
      const encPassword = await bcrypt.hash(email, 10)
      const user = await signUp({ email, name }, encPassword)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60000,
      })
      await transporter.sendMail(welcome(user))
      return res.status(201).json({
        message: 'User created successfully',
        data: {
          email: user.email,
          token,
          name: user.name,
          imagesDone: user.imagesDone,
          new: true,
        },
      })
    } else {
      const token = jwt.sign(
        { id: exitingUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60000,
        }
      )
      if (exitingUser.mode === 'customer') {
        return res.status(200).json({
          message: 'Login successfully',
          data: {
            token,
            email: exitingUser.email,
            name: exitingUser.name,
            imagesDone: exitingUser.imagesDone,
            mode: exitingUser.mode,
            new: false,
          },
        })
      } else {
        return res.status(200).json({
          message: 'Login successfully',
          data: {
            token,
            email: exitingUser.email,
            name: exitingUser.name,
            imagesDone: exitingUser.imagesDone,
            skills: exitingUser.skills,
            location: exitingUser.location,
            mode: exitingUser.mode,
            city: exitingUser.city,
            new: false,
          },
        })
      }
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not be created', data: err })
  }
}

async function updateAvatarHandler(req, res) {
  const id = req.user
  const data = req.body
  try {
    const user = await updateAvatar(id, data)
    return res.status(200).json({ message: 'User updated', data: user })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not been updated', data: e })
  }
}
async function updateRegularDataHandler(req, res) {
  const id = req.user
  const data = req.body
  try {
    const user = await updateRegularData(id, data)
    return res.status(200).json({ message: 'User updated', data: user })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not been updated', data: e })
  }
}
async function allArtistsHandler(req, res) {
  try {
    const artists = await allArtists()
    return res.status(200).json({ message: 'All artists found', data: artists })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Artists not could been found', data: e })
  }
}

module.exports = {
  signInHandle,
  oneUserHandler,
  allArtistsHandler,
  dataOfUserHandler,
  updateRegularDataHandler,
  signUpHandle,
  filteredArtistHandler,
  updatePhotoshandler,
  updateUserDataHandler,
  thirdPartAuthenticatio,
  allArtistsUserHandler,
  updateAvatarHandler,
}
