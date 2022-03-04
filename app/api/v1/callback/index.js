"use strict";
const express = require("express");
const router = express.Router();
const LipaNaMpesaCallback = require("./callBack").LipaNaMpesaCallback;

router.post("/lipa-na-mpesa", LipaNaMpesaCallback);

module.exports = router;
