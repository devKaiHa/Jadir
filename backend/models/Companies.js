const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const companiesSchema = new mongoose.Schema(
  {
    name: { type: multilingualSchema },
    logo: { type: String, default: "" },
    brief: { type: multilingualSchema },
    testimonial: { type: multilingualSchema },
    slug: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("companies", companiesSchema);
