const router = require('express').Router();
const instructorController = require('./insturctor.controller');
const { auth } = require('../../utils/auth');

router.route('/').post(instructorController.signup);

module.exports = router;
