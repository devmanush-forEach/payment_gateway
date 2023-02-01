const { default: mongoose } = require("mongoose");
const userModel = require("./user.model");

const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
