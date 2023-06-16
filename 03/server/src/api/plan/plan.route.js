const express = require('express')
const {
  getAllPlansHandler,
  getOnePlanHandler,
  deletePlanHandler,
  createPlanHandler,
  updatePlanHandler,
} = require('./plan.controller')

const router = express.Router()

router.post('/new', createPlanHandler)
router.get('/all', getAllPlansHandler)
router.get('/one/:planId', getOnePlanHandler)
router.put('/update', updatePlanHandler)
router.delete('/delete', deletePlanHandler)

module.exports = router
