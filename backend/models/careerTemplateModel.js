const mongoose = require("mongoose");
const multilingualSchema = require("./multilingualModel");

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

const careerTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: multilingualSchema, default: () => ({}) },
    position: { type: multilingualSchema, default: () => ({}) },
    description: { type: multilingualSchema, default: () => ({}) },
    location: { type: multilingualSchema, default: () => ({}) },
    applicationLink: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    applicationForm: {
      fields: { type: [fieldSchema], default: [] },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("careerTemplate", careerTemplateSchema);
