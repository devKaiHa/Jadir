const mongoose = require("mongoose");

const homeSliderSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("homeSlider", homeSliderSchema);
