const transactionModel = require("../../../models/transaction.model");

exports.LipaNaMpesaCallback = async (req, res) => {
  const data = req.body.Body.stkCallBack;

  if (data != undefined || data != null) {
    let result_code = data.ResultCode;

    if (result_code === 0) {
      let checkout_request_id = data.CheckoutRequestID;

      let transaction = await transactionModel.findOne({
        checkout_request_id: checkout_request_id,
      });

      transaction.status = true;
      transaction.message = data.ResultDesc;
      transaction.response = data;
      transaction.dump = data;
      transaction.save();
    } else {
      let transaction = await transactionModel.findOne({
        checkout_request_id: checkout_request_id,
      });

      transaction.status = false;
      transaction.message = data.ResultDesc;
      transaction.response = data;
      transaction.dump = data;
      transaction.save();
    }
  }
};
