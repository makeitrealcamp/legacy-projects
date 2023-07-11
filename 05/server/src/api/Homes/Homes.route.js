const router = require("express").Router();
const homesController = require("./Homes.controller");
const {auth} = require('../Utils/auth');
const formData = require("../Utils/formData");

router.route("/").get(homesController.list)
router.route('/listings').get(auth,homesController.showUser)
router.route('/filter').post(homesController.listFilter)
router.route("/:homeId").get(homesController.show)
router.route("/").post(auth,formData,homesController.create)
router.route("/:homeId").put(auth,homesController.update)
router.route("/:homeId").delete(auth,homesController.destroy)

module.exports = router;