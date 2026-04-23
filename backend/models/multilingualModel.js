const mongoose = require("mongoose");

const multilingualSchema = new mongoose.Schema(
  {
    ar: String,
    en: String,
  },
  { _id: false },
);

module.exports = multilingualSchema;
