const express = require('express')
const {
  createMessageHandler,
  allMessagesHandler,
} = require('./message.controller')
const { authenticate } = require('../../utils/auth')

const router = express.Router()

router.post('/add', authenticate, createMessageHandler)
router.get('/all/:receiverId', authenticate, allMessagesHandler)

module.exports = router
