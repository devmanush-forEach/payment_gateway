const transactionController = require("../controllers/transaction.controller");
const Authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/pay", Authenticate, transactionController.sendMoney);
router.get("/getList", Authenticate, transactionController.getAll);

module.exports = router;
