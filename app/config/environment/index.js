"use strict";
var path = require("path");
var _ = require("lodash");

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
}

const convert = require("xml-js");
const fs = require("fs");

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  appName: "Bubble Pesa",

  // Root path of server
  root: path.normalize(__dirname + "/../../.."),

  // Server port
  port: process.env.PORT || 9090,

  // Server IP
  ip: process.env.IP || "0.0.0.0",

  // Should we populate the DB with sample data?
  seedDB: false,

  LOCAL_URL: "http://localhost:9090",
  URL: "http://localhost:9090",

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true,
      },
      useMongoClient: true,
    },
  },
};
module.exports = _.merge(
  all,
  require("./" + process.env.NODE_ENV + ".js") || {}
);
