const mongoose = require("mongoose");
const multilingualSchema = require("../multilingualModel");

const partnerSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema },
    brief: { type: multilingualSchema },
    testimonial: { type: multilingualSchema },
    img: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("partners", partnerSchema);
