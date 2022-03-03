/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

process.env.TZ = "Africa/Nairobi";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/environment");
const cors = require("cors");
mongoose.Promise = global.Promise;
// Connect to database
require("./utils/db");

console.info("Connecting to database");

// Setup server
var app = express();

app.use(cors());

// Register schema for models
require("./models")();
require("./config/express")(app);
require("./routes")(app);
require("./common");

/* Run Cron*/
const cronScheduler = require("./cron");
cronScheduler.runCron();

// Start server

app.get("/", (req, res) =>
  res.send(`${config.appName} Server running on port : ${config.port}`)
);
// Start server
let PORT = config.port;
app.listen(config.port, config.ip, () => {
  console.info(
    `Express server listening on ${config.port} and ip ${
      config.ip
    }, in ${app.get("env")} mode follow http://localhost:${config.port}/`
  );
});

process.on("uncaughtException", (err) => {
  console.error(`Caught exception: ${err}`);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

module.exports.port = PORT;
module.exports.app = app;
