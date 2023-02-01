const walletController = require("../controllers/wallet.controller");
const Authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/pay", Authenticate, walletController.sendMoney);

module.exports = router;
