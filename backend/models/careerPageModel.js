const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const careerSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema, default: () => ({}) },
    position: { type: multilingualSchema, default: () => ({}) },
    description: { type: multilingualSchema, default: () => ({}) },
    slug: { type: String, unique: true, sparse: true, index: true },
    image: { type: String, default: "" },
    location: { type: multilingualSchema, default: () => ({}) },
    applicationLink: { type: String, default: "" },
    endDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("career", careerSchema);
