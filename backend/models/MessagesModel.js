const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    requestType: {
      type: String,
      enum: [
        "inquiry",
        "consult-inquiry",
        "service-request",
        "partnership",
        "media",
        "support",
        "complaint",
        "investment-inquiry",
      ],
      default: "consult-inquiry",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
      default: null,
    },
    message: { type: String, default: "" },
    reply: { type: String, default: "" },
    isReplied: { type: Boolean, default: false },
    repliedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ["new", "replied", "archived"],
      default: "new",
    },
    attachment: {
      filename: { type: String, default: "" },
      originalName: { type: String, default: "" },
      mimetype: { type: String, default: "" },
      size: { type: Number, default: 0 },
      path: { type: String, default: "" },
      url: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("messages", messagesSchema);
