const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const categorySchema = new mongoose.Schema(
  {
    name: { type: multilingualSchema },
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("category", categorySchema);
