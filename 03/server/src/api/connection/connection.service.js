const Connection = require('./connection.model')

function createConnection(userA, userB) {
  return Connection.create({ userA: userA._id, userB: userB._id })
}

function updateConnection(id, data) {
  return Connection.findByIdAndUpdate(id, data, { new: true })
    .populate('userB')
    .populate('userA')
}

function deleteConnection(id) {
  return Connection.findByIdAndDelete(id)
}

module.exports = { createConnection, updateConnection, deleteConnection }
