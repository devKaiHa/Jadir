const mongoose = require("mongoose");
const multilingualSchema = require("../multilingualModel");

const footerLinks = new mongoose.Schema(
  {
    title: String,
    link: String,
  },
  { _id: false },
);

const workingScheduleDay = new mongoose.Schema(
  {
    key: { type: String, default: "" },
    day: { type: multilingualSchema },
    hours: { type: multilingualSchema },
    isClosed: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const footerSchema = new mongoose.Schema(
  {
    description: { type: multilingualSchema },
    address: { type: multilingualSchema },
    links: { type: [footerLinks], default: [] },
    facebook: String,
    instagram: String,
    xTwitter: String,
    linkedin: String,
    phone: String,
    email: String,
    workDays: { type: String, default: "" },
    workingHours: { type: String, default: "" },
    workingSchedule: { type: [workingScheduleDay], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("footer", footerSchema);
