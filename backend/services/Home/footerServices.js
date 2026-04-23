const asyncHandler = require("express-async-handler");
const footerModel = require("../../models/Home/FooterModel");

const normalizeLangField = (value = {}) => ({
  en: value?.en || "",
  ar: value?.ar || "",
});

const normalizeWorkingSchedule = (schedule = []) =>
  Array.isArray(schedule)
    ? schedule.map((item, index) => ({
        key: item?.key || "",
        day: normalizeLangField(item?.day),
        hours: normalizeLangField(item?.hours),
        isClosed: Boolean(item?.isClosed),
        order: Number(item?.order ?? index),
      }))
    : [];

exports.getFooter = asyncHandler(async (req, res) => {
  const footer = await footerModel.findOne();

  res.status(200).json({
    status: true,
    message: footer ? "Footer fetched successfully" : "Footer not found",
    data: footer,
  });
});

exports.updateFooter = asyncHandler(async (req, res) => {
  if (Array.isArray(req.body?.workingSchedule)) {
    req.body.workingSchedule = normalizeWorkingSchedule(
      req.body.workingSchedule,
    );
  }

  const footer = await footerModel.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  res.status(200).json({
    status: true,
    message: "Footer saved successfully",
    data: footer,
  });
});
