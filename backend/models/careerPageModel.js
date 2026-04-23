const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const careerSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema, default: () => ({}) },
    description: { type: multilingualSchema, default: () => ({}) },
    image: { type: String, default: "" },
    applicationLink: { type: String, default: "" },
    endDate: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("career", careerSchema);
