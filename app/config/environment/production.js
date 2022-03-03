"use strict";

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb+srv://root:pOb65aiHpnDKH3so@cluster0.h85gf.mongodb.net/bubble_pesa?retryWrites=true&w=majority",
  },
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "0.0.0.0",
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9090,
  seedDB: false,
};
