const mongoose = require("mongoose");
const multilingualSchema = require("../multilingualModel");

const plansSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema },
    description: { type: multilingualSchema },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("plans", plansSchema);
