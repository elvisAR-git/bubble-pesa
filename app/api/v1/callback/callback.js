const transactionModel = require("../../../models/transaction.model");

exports.LipaNaMpesaCallback = async (req, res) => {
  if (req.body.Body == undefined) {
    // check if body is empty
    return res.send("invalid request");
  }
  const data = req.body.Body.stkCallback;
  console.log(data);

  if (data != undefined || data != null) {
    let result_code = data.ResultCode;
    let checkout_request_id = data.CheckoutRequestID;
    if (result_code === 0) {
      let transaction = await transactionModel.findOne({
        checkout_request_id: checkout_request_id,
      });

      transaction.status = true;
      transaction.message = data.ResultDesc;
      transaction.response = data;
      transaction.dump = data;
      transaction.metadata = data.CallbackMetadata;
      transaction.mpesaReceiptNumber = data.CallbackMetadata.Item[1].value;
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
    res.send("success");
  } else {
    res.send("error");
  }
};
