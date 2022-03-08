"use strict";
const express = require("express");
const router = express.Router();

router.put("/", require("./config").createConfigurations);

module.exports = router;
