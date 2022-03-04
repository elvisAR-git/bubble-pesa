"use strict";
const express = require("express");
const router = express.Router();
const lipaNaMpesaRoute = require("./payment").lipaNaMpesa;

router.post("/lipa-na-mpesa", lipaNaMpesaRoute);

module.exports = router;
