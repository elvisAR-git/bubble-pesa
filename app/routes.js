/**
 * Main application routes
 */
module.exports = (app) => {
  app.use("/api/v1/test", require("./api/test"));
  app.use("/api/v1/payment", require("./api/v1/payment"));
  app.use("/api/v1/callback", require("./api/v1/callback"));
  app.use("/api/v1/common", require("./api/v1/common"));
};
