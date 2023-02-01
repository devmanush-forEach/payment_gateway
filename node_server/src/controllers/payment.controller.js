const instance = require("../configs/razorpay");
const crypto = require("crypto");
const userModel = require("../models/user.model");
const walletModel = require("../models/wallet.model");
const razorpayTransactionModel = require("../models/razorpayTransaction.model");

const paymentController = {
  setOrder: async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
        partial_payment: false,
        notes: {
          key1: "value3",
          key2: "value2",
        },
      };
      const order = await instance.orders.create(options);
      return res.status(200).send({ success: true, order: order });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  paymentVerification: async (req, res) => {
    try {
      const {
        ids: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
        amount,
      } = req.body;
      const user_id = req.userid;

      console.log(req.body.ids);

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        try {
          const rpt = await razorpayTransactionModel.create({
            ...ids,
            userId: user_id,
            amount: amount,
          });

          const user = await userModel.findById(user_id).lean().exec();

          const wallet = await walletModel.findByIdAndUpdate(
            user.walletId,
            {
              walletMoney: amount,
            },
            { new: true }
          );
        } catch (error) {
          return res.status(400).send(error.message);
        }

        return res
          .status(200)
          .send({ success: true, payment_id: razorpay_payment_id });
      }

      return res.status(400).send({ success: false, payment_id: null });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};

module.exports = paymentController;
