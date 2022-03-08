const configurationsModel = require("../../../models/configurations.model");

const { send_response } = require("../../../common");

exports.createConfigurations = function (req, res) {
  const {
    innitiatorName,
    description,
    passKey,
    shortCode,
    consumerKeyC2B,
    consumerSecretC2B,
  } = req.body;

  if (
    !innitiatorName ||
    !description ||
    !passKey ||
    !shortCode ||
    !consumerKeyC2B ||
    !consumerSecretC2B
  ) {
    return res.send(
      send_response(null, true, "Please provide all required fields", 400)
    );
  } else {
    //   chek if exist

    configurationsModel.findOne({ shortCode }, function (err, result) {
      if (err) {
        return res.send(send_response(null, true, "Error occured", 500));
      } else if (result) {
        return res.send(
          send_response(null, true, "Configurations already exist", 400)
        );
      } else {
        configurationsModel.create(req.body, function (err, result) {
          if (err) {
            return res.send(send_response(null, true, "Error occured", 500));
          } else {
            return res.send(
              send_response(result, false, "Configuration created", 200)
            );
          }
        });
      }
    });
  }
};
