const mongoose = require("mongoose");

const fieldOptionSchema = new mongoose.Schema(
  {
    label: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const fieldSchema = new mongoose.Schema(
  {
    label: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: [
        "text",
        "textarea",
        "email",
        "phone",
        "number",
        "date",
        "radio",
        "checkbox",
        "select",
        "file",
      ],
      default: "text",
    },
    placeholder: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    required: { type: Boolean, default: false },
    options: { type: [fieldOptionSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const careerApplicationFormSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "career",
      required: true,
      unique: true,
      index: true,
    },
    fields: { type: [fieldSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "careerApplicationForm",
  careerApplicationFormSchema,
);
