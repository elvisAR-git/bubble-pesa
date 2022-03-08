"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autopopulate = require("mongoose-autopopulate");

var schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: { createdAt: "create_date", updatedAt: "last_updated" },
};

var TransactionSchema = new Schema(
  {
    metaData: { type: Object, default: {} },
    innitiator_id: { type: String, default: null },
    beneficiary_id: { type: String, default: null },
    amount: { type: Number, default: null },
    partyA: { type: String, default: null },
    partyB: { type: String, default: null },
    accountReference: { type: String, default: null },
    message: { type: String, default: null },
    response: { type: Object, default: {} },
    description: { type: String, default: null },
    checkout_request_id: { type: String, default: null },
    merchant_request_id: { type: String, default: null },
    mpesaReceiptNumber: { type: String, default: null },
    configuration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Configurations",
      autopopulate: true,
    },
    dump: { type: Object, default: {} },
    status: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  schemaOptions
);

TransactionSchema.plugin(autopopulate);

TransactionSchema.pre("save", function (next) {
  this.last_updated = new Date();
  if (!this.isNew) {
    return next();
  }
  next();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
