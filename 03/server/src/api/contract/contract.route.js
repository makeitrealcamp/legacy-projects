const express = require('express')
const {
  createContractHandler,
  updateContractHandler,
  getContractHandler,
  createCheckout,
  lastUpdateContractHandler,
  acceptContractHandler,
  deleteContractHandler,
} = require('./contract.controller')
const { authenticate } = require('../../utils/auth')

const router = express.Router()

router.post('/new', authenticate, createContractHandler)
router.put('/update', authenticate, updateContractHandler)
router.put('/last-update', authenticate, lastUpdateContractHandler)
router.put('/accept/:contractId', authenticate, acceptContractHandler)
router.get('/by-name/:contractName', authenticate, getContractHandler)
router.post('/create-payment-intent', authenticate, createCheckout)
router.delete('/delete/:contractId', authenticate, deleteContractHandler)

module.exports = router
