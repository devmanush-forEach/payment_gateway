const { default: mongoose } = require("mongoose");
const userModel = require("./user.model");

const razorpayTransactionSchema = new mongoose.Schema(
  {
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RazorpayTransaction",
  razorpayTransactionSchema
);
