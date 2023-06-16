const User = require('../user/user.model')
const {
  createConnection,
  updateConnection,
  deleteConnection,
} = require('./connection.service')
const {
  transporter,
  connectionConfirmation,
  connectionRequest,
} = require('../../utils/mailer')

async function createConnectionHandler(req, res) {
  try {
    const id = req.user
    const data = req.body
    const userA = await User.findById(id)
    const userB = await User.findOne({ email: data.email })
    const connection = await createConnection(userA, userB)
    userA.connections.push(connection)
    await userA.save({ validateBeforeSave: false })
    userB.connections.push(connection)
    await userB.save({ validateBeforeSave: false })
    await transporter.sendMail(connectionRequest(userB, userA))
    return res
      .status(201)
      .json({ message: 'Connection created', data: connection })
  } catch (e) {
    return res.status(400).json({ message: 'Connection not created', data: e })
  }
}

async function updateConnectionHandler(req, res) {
  try {
    const data = req.body
    const { connectionId } = req.params
    const connection = await updateConnection(connectionId, data)
    const client = connection.userA
    const artist = connection.userB
    await transporter.sendMail(connectionConfirmation(artist, client))
    return res
      .status(200)
      .json({ message: 'Connection updated', data: connection })
  } catch (e) {
    return res.status(400).json({ message: 'Connection updated', data: e })
  }
}

async function deleteConnectionHandler(req, res) {
  try {
    const { connectionId } = req.params
    const connection = await deleteConnection(connectionId)
    const userA = await User.findById(connection.userA)
    userA.connections = userA.connections.filter(
      (item) => item._id !== connection._id
    )
    await userA.save({ validateBeforeSave: false })
    const userB = await User.findById(connection.userB)
    userB.connections = userB.connections.filter(
      (item) => item._id !== connection._id
    )
    await userB.save({ validateBeforeSave: false })
    return res
      .status(200)
      .json({ message: 'Connection deleted', data: connection })
  } catch (e) {
    return res.status(400).json({ message: 'Connection not deleted', data: e })
  }
}

module.exports = {
  createConnectionHandler,
  updateConnectionHandler,
  deleteConnectionHandler,
}
