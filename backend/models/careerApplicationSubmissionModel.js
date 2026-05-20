const mongoose = require("mongoose");

const uploadedFileSchema = new mongoose.Schema(
  {
    originalName: { type: String, default: "" },
    filename: { type: String, default: "" },
    path: { type: String, default: "" },
    mimetype: { type: String, default: "" },
    size: { type: Number, default: 0 },
  },
  { _id: false },
);

const answerSchema = new mongoose.Schema(
  {
    field: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    label: { type: mongoose.Schema.Types.Mixed, default: "" },
    type: { type: String, default: "text" },
    value: { type: mongoose.Schema.Types.Mixed, default: "" },
    files: { type: [uploadedFileSchema], default: [] },
  },
  { _id: false },
);

const careerApplicationSubmissionSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "career",
      required: true,
      index: true,
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "careerApplicationForm",
      required: true,
    },
    answers: { type: [answerSchema], default: [] },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "careerApplicationSubmission",
  careerApplicationSubmissionSchema,
);
