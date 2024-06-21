const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Order } = require("../models");
const axios = require("axios");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "InvalidLogin", message: "Email is required" };
      }
      if (!password) {
        throw { name: "InvalidLogin", message: "Password is required" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }

  /* static async upgradeAccount(req, res, next) {
    try {
      const { orderId } = req.body;

      const order = await Order.findOne({ where: { orderId } });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (req.user.subscription === "premium") {
        return res.status(400).json({ message: "You are already premium" });
      }

      if (order.status === "paid") {
        return res.status(400).json({ message: "Order already paid" });
      }

      const serverKey = "SB-Mid-server-ILrHXsMPJ2hxbqREWRXk96lO";
      const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");
      const { data } = await axios({
        method: "GET",
        url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        headers: {
          Authorization: `Basic ${base64ServerKey}`,
        },
      });

      // console.log(data);
      if (data.transaction_status === "capture" && data.status_code === "200") {
        // await req.user.update({ subscription: "premium" });
        const user = await User.findByPk(req.user.id);
        user.update({ subscription: "premium" });

        await order.update({ status: "paid", paidDate: new Date() });

        res.json({ message: "Upgrade Success" });
      } else {
        res.status(400).json({
          message: "Upgrade Failed, Please call our customer support",
          midtransMessage: data.status_message,
        });
      }
    } catch (error) {
      next(error);
    }
  } */
};
