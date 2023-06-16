const User = require('../user/user.model')
const Contract = require('./contract.model')

function createContract(name, clientId, artistId) {
  return Contract.create({
    contractName: name,
    client: clientId,
    artist: artistId,
  })
}

function updateContract(id, data) {
  return Contract.findByIdAndUpdate(id, data, { new: true })
    .populate('client')
    .populate('artist')
}

function getContracts(name) {
  return Contract.find({ contractName: name })
    .populate('client')
    .populate('artist')
}

async function deleteContract(contractId, clientId) {
  const contract = await Contract.findById(contractId)
  const client = await User.findById(clientId)
  client.contracts.filter((item) => item._id !== contract._id)
  await client.save({ validateBeforeSave: false })
  const artist = await User.findById(contract.artist._id)
  artist.contracts.filter((item) => item._id !== contractId)
  await artist.save({ validateBeforeSave: false })
  return Contract.findByIdAndDelete(contractId)
}

module.exports = {
  createContract,
  updateContract,
  getContracts,
  deleteContract,
}
