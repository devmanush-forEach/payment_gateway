const userController = require("../controllers/user.controller");
const Authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.get("/", Authenticate, userController.getUser);
router.get("/reciever", Authenticate, userController.getReciever);
router.get("/all", userController.getUserById);
router.post("/update", Authenticate, userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
