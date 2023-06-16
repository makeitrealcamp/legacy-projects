const express = require('express')
const { createCommentHandler } = require('./comment.controller')
const { authenticate } = require('../../utils/auth')

const router = express.Router()

router.post('/new/:postId', authenticate, createCommentHandler)

module.exports = router
