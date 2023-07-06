const router = require("express").Router();
const courseController = require('./course.controller');
const { auth } = require('../../utils/auth');

router.route("/").post(auth, courseController.create)
router.route('/test').get(auth, courseController.listUserCourses)
router.route('/test').post(auth, courseController.createUserCourses)
router.route("/:courseId").get(auth, courseController.show)
router.route("/:courseId").put(auth, courseController.update)
router.route("/:courseId").delete(auth, courseController.destroy)
router.route("/").get(courseController.listAllCourses)

module.exports = router;
