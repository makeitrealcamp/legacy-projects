const router = require('express').Router();
const userController = require('./user.controller');
const { auth } = require('../../utils/auth');

router.route('/').post(userController.signup);
router.route('/login').post(userController.login);
router.route('/').get(auth, userController.showSingleUser)
router.route('/').put(auth, userController.instructorTrue)

module.exports = router;
