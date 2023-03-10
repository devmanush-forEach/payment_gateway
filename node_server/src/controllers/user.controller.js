const userModel = require("../models/user.model");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await userModel
        .findOne({ _id: req.userid })
        .populate("walletId")
        .lean()
        .exec();
      return res.status(200).send({ user: user });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  getReciever: async (req, res) => {
    try {
      const phone = req.query.phone;
      const user = await userModel
        .findOne({ phone: phone })
        .select({ name: 1, _id: 0 })
        .lean()
        .exec();
      if (!user) {
        return res
          .status(400)
          .send({ error: "Please enter a valid user's Phone number" });
      }
      return res.status(200).send({ user: user });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const users = await userModel.find().populate("walletId").lean().exec();
      res.status(200).send(users);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const userid = req.userid;
      const { name, email, phone, profile } = req.body;
      const toUpdate = {
        name,
        email,
        phone,
        profile: req.file.path ? req.file.path : profile,
      };
      const updated = await userModel.findByIdAndUpdate(userid, toUpdate, {
        new: true,
      });

      return res.status(201).send(updated);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};

module.exports = userController;
