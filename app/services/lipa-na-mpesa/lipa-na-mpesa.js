const mpesa = require("../../config/environment").mpesa;
const axios = require("axios");
const { AuthBasic } = require("../mpesa-auth-service");
const transactionModel = require("../../models/transaction.model");
const configurationsModel = require("../../models/configurations.model");
const moment = require("moment");

module.exports = class LipaNaMpesa {
  BusinessShortCode = "";
  Passkey = "";
  TimeStamp = moment(new Date()).format("YYYYMMDDHHmmss");
  TransactionType = "CustomerBuyGoodsOnline";
  Amount = "";
  PartyA = "";
  PartyB = "";
  PhoneNumber = "";
  CallBackURL = mpesa.callback_url + "lipa-na-mpesa/";
  AccountReference = "";
  TransactionDesc = "";
  transactionId = "";

  response = {};

  constructor(
    shortCode,
    amount,
    phoneNumber,
    accountReference,
    transactionDesc,
    transactionId
  ) {
    this.BusinessShortCode = shortCode;
    this.Amount = amount;
    this.PhoneNumber = phoneNumber;
    this.AccountReference = accountReference;
    this.TransactionDesc = transactionDesc;
    this.PartyA = phoneNumber;
    this.PartyB = shortCode;
    this.transactionId = transactionId;
  }

  setCallBackURL(url) {
    this.CallBackURL = url;
  }

  async send() {
    const configurations = await configurationsModel.findOne({
      shortCode: this.BusinessShortCode,
    });
    if (configurations) {
      this.Passkey = configurations.passKey;

      const { access_token } = await new AuthBasic(
        configurations.consumerKeyC2B,
        configurations.consumerSecretC2B
      ).requestAccessToken();

      if (access_token) {
        console.log("Access Granted", access_token);

        let password = new Buffer.from(
          this.PartyB + this.Passkey + this.TimeStamp
        ).toString("base64");

        let trans = {
          BusinessShortCode: this.BusinessShortCode,
          Password: password,
          Timestamp: this.TimeStamp,
          TransactionType: this.TransactionType,
          Amount: this.Amount,
          PartyA: this.PartyA,
          PartyB: this.PartyB,
          PhoneNumber: this.PhoneNumber,
          CallBackURL: this.CallBackURL,
          AccountReference: this.AccountReference,
          TransactionDesc: this.TransactionDesc,
        };

        console.log("Transaction", trans);

        let transaction = await transactionModel.findOne({
          _id: this.transactionId,
        });

        await axios
          .post(mpesa.lipa_na_mpesa_online_url, trans, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(async (response) => {
            transaction.message = response.data.ResponseDescription;
            transaction.response = response.data;
            transaction.dump = response.data;
            transaction.checkout_request_id = response.data.CheckoutRequestID;
            transaction.merchant_request_id = response.data.MerchantRequestID;
            transaction.save();

            this.response = {
              is_error: false,
              message: response.data.ResponseDescription,
              data: response.data,
            };
          })
          .catch(async (err) => {
            transaction.status = false;
            transaction.message = err.response.data.errorMessage;
            transaction.response = err.response.data;
            transaction.dump = err.response.data;
            transaction.save();

            this.response = {
              is_error: true,
              message: err.response.data.errorMessage,
              response: err.response.data,
            };
          });

        return this.response;
      } else {
        return {
          is_error: true,
          message: "Access Denied",
          response: {},
        };
      }
    } else {
      return {
        is_error: true,
        message: "Short Code Not Found",
        response: {},
      };
    }
  }
};
