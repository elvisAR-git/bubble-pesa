/**
 * Main application routes
 */
module.exports = (app) => {
  app.use("/api/v1/test", require("./api/test"));
  app.use("/api/v1/common", require("./api/v1/common"));
};
