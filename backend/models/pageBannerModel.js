const mongoose = require("mongoose");

const pageBannerSchema = new mongoose.Schema(
  {
    about: { type: String, default: "" },
    services: { type: String, default: "" },
    projects: { type: String, default: "" },
    blogs: { type: String, default: "" },
    careers: { type: String, default: "" },
    search: { type: String, default: "" },
    contact: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("pageBanner", pageBannerSchema);
