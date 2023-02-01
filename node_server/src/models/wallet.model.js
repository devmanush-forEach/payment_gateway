const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const walletSchema = new mongoose.Schema(
  {
    walletMoney: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
