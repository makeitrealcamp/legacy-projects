const {
  updateConnectionHandler,
  createConnectionHandler,
  deleteConnectionHandler,
} = require('./connection.controller')
const express = require('express')
const { authenticate } = require('../../utils/auth')

const router = express.Router()

router.post('/new', authenticate, createConnectionHandler)
router.put('/update/:connectionId', authenticate, updateConnectionHandler)
router.delete('/delete/:connectionId', authenticate, deleteConnectionHandler)

module.exports = router
