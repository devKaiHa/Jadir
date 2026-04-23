const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const policySchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema },
    slug: { type: String, unique: true, index: true },
    summary: { type: multilingualSchema },
    content: { type: multilingualSchema },
    policyType: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("policy", policySchema);
