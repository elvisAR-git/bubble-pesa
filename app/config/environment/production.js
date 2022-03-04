"use strict";

let uri = process.env.PROD_DB;
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: uri,
  },
  mpesa: {
    username: process.env.CLIENT_ID,
    password: process.env.CLIENT_SECRET,
    auth_url:
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    transaction_url:
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    validation_url: "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    b2c_url: "https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
    b2b_url: "https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
    account_balance_url:
      "https://api.safaricom.co.ke/mpesa/accountbalance/v1/query",
    reversal_url: "https://api.safaricom.co.ke/mpesa/reversal/v1/request",
    lipa_na_mpesa_online_url:
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    lipa_na_mpesa_online_query_url:
      "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    callback_url: `${process.env.APP_URL}/api/v1/callback/`,
  },
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "0.0.0.0",
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9090,
  seedDB: false,
};
