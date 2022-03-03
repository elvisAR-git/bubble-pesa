/**
 * Express configuration
 */

"use strict";
var morgan = require("morgan");
var compression = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");

module.exports = function (app) {
  var env = app.get("env");

  app.use(compression());
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "100mb",
      parameterLimit: 50000,
    })
  );
  app.use(bodyParser.json({ inflate: true, limit: "100mb" }));
  app.use(methodOverride());

  if ("production" === env) {
    app.use(morgan("dev"));
  }

  if ("development" === env || "test" === env) {
    app.use(require("connect-livereload")({ port: 35730 }));
    app.use(morgan("dev"));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
