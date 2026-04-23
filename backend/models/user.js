const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    slug: { type: String, default: "", index: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
