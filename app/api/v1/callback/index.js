"use strict";
const express = require("express");
const router = express.Router();
const LipaNaMpesaCallback = require("./callback").LipaNaMpesaCallback;

router.post("/lipa-na-mpesa", LipaNaMpesaCallback);

module.exports = router;
