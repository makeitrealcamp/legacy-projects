const { createMessage, allMessages } = require('./message.service')

async function createMessageHandler(req, res) {
  const { receiver, body } = req.body
  const id = req.user
  try {
    const message = await createMessage(id, receiver, body)
    return res.status(201).json({ message: 'Message added', data: message })
  } catch (e) {
    return res.status(400).json({ message: 'Message not added', data: e })
  }
}

async function allMessagesHandler(req, res) {
  const { receiverId } = req.params
  const id = req.user
  try {
    const messagesFromTo = await allMessages(id, receiverId)
    const messagesToFrom = await allMessages(receiverId, id)
    const messages = [...messagesFromTo, ...messagesToFrom]
    const orderedMessages = messages.sort((a, b) => a.createdAt - b.createdAt)
    return res
      .status(200)
      .json({ message: 'Messages found', data: orderedMessages })
  } catch (e) {
    return res.status(400).json({ message: 'Messages not found', data: e })
  }
}

module.exports = { createMessageHandler, allMessagesHandler }
