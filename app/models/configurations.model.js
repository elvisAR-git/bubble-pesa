"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autopopulate = require("mongoose-autopopulate");

var schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: { createdAt: "create_date", updatedAt: "last_updated" },
};

var ConfigurationsSchema = new Schema(
  {
    metaData: { type: Object, default: {} },
    slug: { type: String, default: null },

    innitiatorName: { type: String, default: null },
    description: { type: String, default: null },
    passKey: { type: String, default: null },
    shortCode: { type: String, default: null },

    consumerKeyC2B: { type: String, default: null },
    consumerSecretC2B: { type: String, default: null },

    consumerkeyB2C: { type: String, default: null },
    consumerSecretB2C: { type: String, default: null },

    consumberKeyB2B: { type: String, default: null },
    consumerSecretB2B: { type: String, default: null },
    status: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  schemaOptions
);

ConfigurationsSchema.plugin(autopopulate);

ConfigurationsSchema.pre("save", function (next) {
  this.last_updated = new Date();
  if (!this.isNew) {
    return next();
  }
  next();
});

module.exports = mongoose.model("Configurations", ConfigurationsSchema);
