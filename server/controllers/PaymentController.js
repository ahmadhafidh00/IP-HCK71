const midtransClient = require("midtrans-client");
const { Order } = require("../models");

module.exports = class PaymentController {
  static async getMidtransToken(req, res, next) {
    try {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        // serverKey is what we got from step 2 before
        serverKey: "SB-Mid-server-ILrHXsMPJ2hxbqREWRXk96lO",
      });

      const parameter = {
        transaction_details: {
          // order_id is a unique identifier for your order
          // this should be unique and different for every transaction
          // so we use Math.random and with prefix trx
          order_id: `trx-${Math.random().toString()}`,
          // gross_amount is the total amount of transaction
          // we use 200000 as an example (this should be dynamic based on your logic/requirement)
          gross_amount: 200000,
        },
        credit_card: {
          secure: true,
        },
        // here is the customer's details
        // for simple transaction you don't have to add this
        customer_details: {
          name: req.user.name,
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      // inside transaction variable, you will get
      // {
      //   ? token should be save to the database for retrieve the transaction status
      //   "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
      //   ? if you are want to redirect user to midtrans payment page, use this redirect_url
      //   "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
      // }
      // ? since we are using snap, we will only need the token
      let transactionToken = transaction.token;

      // create order in our database
      await Order.create({
        orderId: parameter.transaction_details.order_id,
        amount: parameter.transaction_details.gross_amount,
        userId: req.user.id,
      });

      res.json({
        transactionToken,
        orderId: parameter.transaction_details.order_id,
      });
    } catch (error) {
      next(error);
    }
  }
};
