const router = require('express').Router()
const { auth } = require('../Utils/auth')
const reservationController = require('./reservation.controller')

router.route('/create').post(auth,reservationController.create)
router.route('/show').get(auth,reservationController.show)
router.route('/showHost').get(auth,reservationController.showHost)

module.exports = router