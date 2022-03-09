const mpesa = require("../../../config/environment").mpesa;
const transactionModel = require("../../../models/transaction.model");
const configurationsModel = require("../../../models/configurations.model");
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
    res.send(
      send_response(
        {},
        true,
        "All fields are required, check documentation",
        400
      )
    );
  } else {
    let configuration = await configurationsModel.findOne({
      shortCode: partyB,
    });
    if (configuration) {
      let r = await transactionModel.create({
        innitiator_id,
        description,
        beneficiary_id,
        amount,
        partyA,
        partyB,
        accountReference,
        status: false,
        configuration: configuration._id,
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
        const collection = transactionModel.collection;
        const changeStream = collection.watch();
        changeStream.on("change", async (next) => {
          // process next document

          if (next.operationType === "update") {
            if (next.documentKey._id === r._id) {
              let updated_document = await transactionModel.find({
                _id: r._id,
              });
              res.send(
                send_response(
                  updated_document,
                  false,
                  "Transaction completed",
                  200
                )
              );
              changeStream.close();
            }
          }
        });
      }
    } else {
      res.send(
        send_response(
          {},
          true,
          "Invalid short code, that short code is not configured yet :(",
          400
        )
      );
    }
  }
};
