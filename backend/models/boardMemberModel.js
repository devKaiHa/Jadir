const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

const boardMemberSchema = new mongoose.Schema(
  {
    name: { type: multilingualSchema },
    bio: { type: multilingualSchema },
    image: { type: String, default: "" },
    slug: { type: String, unique: true, index: true },
    isFounder: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("boardMember", boardMemberSchema);
