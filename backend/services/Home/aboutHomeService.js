const asyncHandler = require("express-async-handler");
const AboutModel = require("../../models/Home/aboutHome");
const safeParseJSON = require("../../utils/safeParseJson");

exports.parseAboutBody = asyncHandler(async (req, res, next) => {
  // Parse multilingual fields
  if (req.body.content !== undefined) {
    req.body.content = safeParseJSON(req.body.content, "content");
  }

  if (req.body.vision !== undefined) {
    req.body.vision = safeParseJSON(req.body.vision, "vision");
  }

  if (req.body.visionDescription !== undefined) {
    req.body.visionDescription = safeParseJSON(
      req.body.visionDescription,
      "visionDescription",
    );
  }

  if (req.body.message !== undefined) {
    req.body.message = safeParseJSON(req.body.message, "message");
  }

  if (req.body.messageDescription !== undefined) {
    req.body.messageDescription = safeParseJSON(
      req.body.messageDescription,
      "messageDescription",
    );
  }

  if (req.body.businessApproach !== undefined) {
    req.body.businessApproach = safeParseJSON(
      req.body.businessApproach,
      "businessApproach",
    );
  }

  if (req.body.whyUs !== undefined) {
    req.body.whyUs = safeParseJSON(req.body.whyUs, "whyUs");
  }

  if (req.body.whoWeServe !== undefined) {
    req.body.whoWeServe = safeParseJSON(req.body.whoWeServe, "whoWeServe");
  }

  next();
});

exports.getAboutHome = asyncHandler(async (req, res) => {
  const about = await AboutModel.findOne();

  res.status(200).json({
    status: true,
    message: about ? "About home fetched successfully" : "About home not found",
    data: about,
  });
});

exports.updateAboutHome = asyncHandler(async (req, res) => {
  const updatedAbout = await AboutModel.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  res.status(200).json({
    status: true,
    message: "About home saved successfully",
    data: updatedAbout,
  });
});
