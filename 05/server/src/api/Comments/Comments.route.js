const router = require("express").Router();
const commentsController = require("./Comments.controller");
const {auth} = require('../Utils/auth');


router.route("/").get(commentsController.list)
router.route("/:commentId").get(commentsController.show)
router.route("/:homeId").post(auth,commentsController.create)
router.route("/:commentId").put(auth,commentsController.update)
router.route("/:commentId").delete(auth,commentsController.destroy)

module.exports = router;