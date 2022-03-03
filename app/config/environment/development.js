"use strict";
const fs = require("fs");
const path = require("path");
const dbConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db.json"), "utf8")
);

let uri = dbConfig.local_uri;

const mpesaConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "secrets.json"), "utf8")
);

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: uri,
  },
  mpesa: {
    config: mpesaConfig,
  },
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "0.0.0.0",
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9090,
  seedDB: false,
};
