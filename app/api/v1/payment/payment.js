const mpesa = require("../../../config/environment").mpesa;
const transactionModel = require("../../../models/transaction.model");
const { LipaNaMpesa } = require("../../../services/lipa-na-mpesa");
const { send_response } = require("../../../common");

exports.lipaNaMpesa = async (req, res) => {
  const {
    innitiator_id,
    description,
    beneficiary_id,
    amount,
    partyA,
    partyB,
    accountReference,
  } = req.body;

  if (
    !innitiator_id ||
    !beneficiary_id ||
    !amount ||
    !partyA ||
    !partyB ||
    !accountReference
  ) {
    res.send(send_response({}, true, "All fields are required", 400));
  } else {
    let r = await transactionModel.create({
      innitiator_id,
      description,
      beneficiary_id,
      amount,
      partyA,
      partyB,
      accountReference,
      status: false,
    });

    const lipaNaMpesa = new LipaNaMpesa(
      partyB,
      `${amount}`,
      partyA,
      accountReference,
      description,
      r._id
    );

    let response = await lipaNaMpesa.send();

    if (response.is_error) {
      res.send(send_response(response.response, true, response.message, 400));
    } else {
      res.send(send_response(response.response, false, response.message, 200));
    }
  }
};
