const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const CareerModel = require("../models/careerPageModel");
const { uploadSingleImage } = require("../middlewares/uploadingImage");
const safeParseJSON = require("../utils/safeParseJson");

exports.uploadCareerImage = uploadSingleImage("image");

exports.resizeCareerImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `career-${uuidv4()}-${Date.now()}.webp`;
  await fs.promises.mkdir("uploads/careers", { recursive: true });

  await sharp(req.file.buffer)
    .toFormat("webp")
    .webp({ quality: 75 })
    .toFile(`uploads/careers/${filename}`);

  req.body.image = filename;
  next();
});

const parseCareerBody = (body) => {
  if (body.title !== undefined) {
    body.title = safeParseJSON(body.title, "title");
  }

  if (body.description !== undefined) {
    body.description = safeParseJSON(body.description, "description");
  }

  if (body.endDate === "") {
    body.endDate = null;
  }

  return body;
};

exports.getCareers = asyncHandler(async (req, res) => {
  const {
    keyword,
    page = 1,
    limit = 10,
    sort = "endDate createdAt",
  } = req.query;
  const query = {};

  if (keyword?.trim()) {
    const safeKeyword = keyword.trim();
    query.$or = [
      { "title.ar": { $regex: safeKeyword, $options: "i" } },
      { "title.en": { $regex: safeKeyword, $options: "i" } },
      { "description.ar": { $regex: safeKeyword, $options: "i" } },
      { "description.en": { $regex: safeKeyword, $options: "i" } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [careers, total] = await Promise.all([
    CareerModel.find(query).sort(sort).skip(skip).limit(limitNum),
    CareerModel.countDocuments(query),
  ]);

  res.status(200).json({
    status: true,
    data: careers,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      itemsPerPage: limitNum,
    },
  });
});

exports.getPublicCareers = asyncHandler(async (req, res) => {
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  // {$or: [{ endDate: null }, { endDate: { $gte: today } }],}
  const careers = await CareerModel.find().sort({ endDate: 1, createdAt: -1 });

  res.status(200).json({
    status: true,
    data: careers,
  });
});

exports.getOneCareer = asyncHandler(async (req, res, next) => {
  const career = await CareerModel.findById(req.params.id);

  if (!career) {
    return next(new ApiError("Career job not found", 404));
  }

  res.status(200).json({
    status: true,
    data: career,
  });
});

exports.createCareer = asyncHandler(async (req, res) => {
  const career = await CareerModel.create(parseCareerBody(req.body));

  res.status(201).json({
    status: true,
    message: "Career job created successfully",
    data: career,
  });
});

exports.updateCareer = asyncHandler(async (req, res, next) => {
  const career = await CareerModel.findByIdAndUpdate(
    req.params.id,
    parseCareerBody(req.body),
    { new: true, runValidators: true },
  );

  if (!career) {
    return next(new ApiError("Career job not found", 404));
  }

  res.status(200).json({
    status: true,
    message: "Career job updated successfully",
    data: career,
  });
});

exports.deleteCareer = asyncHandler(async (req, res, next) => {
  const career = await CareerModel.findByIdAndDelete(req.params.id);

  if (!career) {
    return next(new ApiError("Career job not found", 404));
  }

  res.status(200).json({
    status: true,
    message: "Career job deleted successfully",
  });
});
