const router = require('express').Router();
const userController = require('./Users.controller');
const { auth } = require('../Utils/auth');

//router.route('/').get(userController.list);
router.route('/').get(auth, userController.show);
//router.route('/').post(userController.create);
router.route('/:userId').put(userController.update);
router.route('/:userId').delete(userController.destroy);
router.route('/singup').post(userController.singup);
router.route('/singin').post(userController.singin);

module.exports = router;
