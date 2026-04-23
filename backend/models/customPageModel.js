const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const customPageSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema },
    slug: { type: String, unique: true },
    content: { type: multilingualSchema },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("customPage", customPageSchema);
