const transactionModel = require("../models/transaction.model");
const userModel = require("../models/user.model");
const walletModel = require("../models/wallet.model");
const bcrypt = require("bcrypt");

const transactionController = {
  getAll: async (req, res) => {
    try {
      const userId = req.userid;

      const transactions = await transactionModel
        .find({
          $or: [{ from: userId }, { to: userId }],
        })
        .populate("from")
        .populate("to")
        .lean()
        .exec();

      const transactionList = transactions.map((ele) => {
        return {
          from: {
            name: ele?.from?.name,
            phone: ele?.from?.phone,
          },
          to: {
            name: ele?.to?.name,
            phone: ele?.to?.phone,
          },
          amount: ele.amount,
          createdAt: ele.createdAt,
        };
      });

      return res.status(200).send(transactionList);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  sendMoney: async (req, res) => {
    try {
      const senderId = req.userid;
      const { phone, amount, password } = req.body;

      const { walletId: senderWallet, password: userPassword } = await userModel
        .findById(senderId)
        .populate("walletId")
        .lean()
        .exec();

      const isCorrectPassword = await bcrypt.compare(password, userPassword);

      if (!isCorrectPassword) {
        return res.status(400).send({ error: "Please Enter Valid Password." });
      }
      if (senderWallet.walletMoney < amount) {
        return res
          .status(400)
          .send({ error: "Amount in wallet is less than entered amount." });
      }

      const fromWallet = await walletModel.findByIdAndUpdate(senderWallet._id, {
        walletMoney: senderWallet.walletMoney - amount,
      });

      const reciever = await userModel
        .findOne({
          phone: phone,
        })
        .populate("walletId")
        .lean()
        .exec();

      const { walletId: recieverWallet, _id: recieverId } = reciever;

      if (!recieverWallet) {
        const wallet = await walletModel.create({ walletMoney: amount });

        const updatedReciever = await userModel.findByIdAndUpdate(recieverId, {
          walletId: wallet._id,
        });
      } else {
        const toWallet = await walletModel.findByIdAndUpdate(
          recieverWallet._id,
          {
            walletMoney: +recieverWallet.walletMoney + amount,
          }
        );
      }

      const toCreate = {
        from: senderId,
        to: recieverId,
        amount,
      };

      const transaction = await transactionModel.create(toCreate);
      // const data = req.body;

      return res.status(200).send(transaction);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};

module.exports = transactionController;
