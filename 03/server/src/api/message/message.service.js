const Message = require('./message.model')

function createMessage(from, to, text) {
  return Message.create({
    sender: from,
    receiver: to,
    body: text,
  })
}

function allMessages(from, to) {
  return Message.find({ sender: from, receiver: to })
}

module.exports = { createMessage, allMessages }
