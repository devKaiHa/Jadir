const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const projectsSchema = new mongoose.Schema(
  {
    title: { type: multilingualSchema },
    slug: { type: String, unique: true, index: true },
    brief: { type: multilingualSchema },
    challenge: { type: multilingualSchema },
    solution: { type: multilingualSchema },
    result: { type: multilingualSchema },
    image: { type: String, default: "" },
    projectLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("projects", projectsSchema);
