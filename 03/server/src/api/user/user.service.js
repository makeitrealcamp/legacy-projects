const User = require('./user.model')
const bcrypt = require('bcrypt')

const signUp = (user, encPassword) => {
  return User.create({ ...user, password: encPassword })
}

const signIn = (email) => {
  return User.findOne({ email })
}

const updateUserPhotos = async (data) => {
  const { email, avatar, background } = data
  const user = await User.findOne({ email })
  return await User.findByIdAndUpdate(
    user.id,
    { imagesDone: { avatar, background } },
    { new: true }
  )
}
const updateAvatar = async (id, data) => {
  const { avatar } = data
  return await User.findByIdAndUpdate(
    id,
    { imagesDone: { avatar } },
    { new: true }
  )
}
const updateRegularData = async (id, data) => {
  const { name, password } = data
  if (name) {
    return User.findByIdAndUpdate(id, { name }, { new: true })
  } else if (password) {
    const encPassword = await bcrypt.hash(password, 10)
    return User.findByIdAndUpdate(id, { password: encPassword }, { new: true })
  }
}

const updateUserData = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true })
}

function dataOfUser(id) {
  return User.findById(id)
    .populate({
      path: 'posts',
      populate: [
        {
          path: 'comments',
          model: 'Comment',
          populate: [{ path: 'author', model: 'User' }],
        },
      ],
    })
    .populate({
      path: 'connections',
      populate: [{ path: 'userA' }, { path: 'userB' }],
    })
    .populate({
      path: 'contracts',
      populate: [{ path: 'client' }, { path: 'artist' }],
    })
}

function allArtistsUser(limit, page) {
  return User.paginate(
    { mode: 'artist/band' },
    {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
    }
  )
}
function allArtists() {
  return User.find({ mode: 'artist/band' }).populate('connections')
}

function oneUser(email) {
  return User.findOne({ email }).populate({
    path: 'posts',
    populate: [
      {
        path: 'comments',
        model: 'Comment',
        populate: [{ path: 'author', model: 'User' }],
      },
    ],
  })
}

function filteredArtist(city, limit, page, instrument, genre) {
  if (city && instrument && genre) {
    return User.paginate(
      { city, instrument, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (city && instrument) {
    return User.paginate(
      { city, instrument, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (city && genre) {
    return User.paginate(
      { city, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (genre && instrument) {
    return User.paginate(
      { instrument, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (city) {
    return User.paginate(
      { city, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (genre) {
    return User.paginate(
      { genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else if (instrument) {
    return User.paginate(
      { instrument, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  } else {
    return User.paginate(
      { mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    )
  }
}

module.exports = {
  signUp,
  dataOfUser,
  updateRegularData,
  signIn,
  updateUserPhotos,
  filteredArtist,
  updateUserData,
  oneUser,
  allArtistsUser,
  allArtists,
  updateAvatar,
}
