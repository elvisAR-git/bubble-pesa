"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autopopulate = require("mongoose-autopopulate");

var schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: { createdAt: "create_date", updatedAt: "last_updated" },
};

var LogSchema = new Schema(
  {
    metaData: { type: Object, default: {} },
    slug: { type: String, default: null },
    description: { type: String, default: null },
    logType: { type: String, default: null },
    dump: { type: Object, default: {} },
    status: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  schemaOptions
);

LogSchema.plugin(autopopulate);

LogSchema.pre("save", function (next) {
  this.last_updated = new Date();
  if (!this.isNew) {
    return next();
  }
  next();
});

module.exports = mongoose.model("Log", LogSchema);
