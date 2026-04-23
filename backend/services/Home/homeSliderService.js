const asyncHandler = require("express-async-handler");
const ApiError = require("../../utils/apiError");
const HomeSliderModel = require("../../models/Home/homeSlider");
const { uploadSingleImage } = require("../../middlewares/uploadingImage");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

exports.uploadSliderImages = uploadSingleImage("img");

exports.resizeSliderImages = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `slider-${uuidv4()}-${Date.now()}.webp`;

  await sharp(req.file.buffer)
    .toFormat("webp")
    .webp({ quality: 70 })
    .toFile(`uploads/homeSlider/${filename}`);

  req.body.img = filename;
  next();
});

const normalizeSliderPayload = (body) => {
  delete body.title;
  delete body.description;
  if (body.order !== undefined) {
    body.order = Number(body.order) || 0;
  }
};

exports.getSliders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = "order createdAt" } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    HomeSliderModel.find({}).sort(sort).skip(skip).limit(limitNum),
    HomeSliderModel.countDocuments({}),
  ]);

  res.status(200).json({
    status: true,
    data,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      itemsPerPage: limitNum,
    },
  });
});

exports.getPublicSliders = asyncHandler(async (req, res) => {
  const sliders = await HomeSliderModel.find({}).sort({
    order: 1,
    createdAt: -1,
  });

  res.status(200).json({
    status: true,
    data: sliders,
  });
});

exports.getOneSlider = asyncHandler(async (req, res, next) => {
  const slider = await HomeSliderModel.findById(req.params.id);

  if (!slider) {
    return next(new ApiError(`No Slider found for this id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: true,
    data: slider,
  });
});

exports.createSlider = asyncHandler(async (req, res) => {
  normalizeSliderPayload(req.body);

  const slider = await HomeSliderModel.create(req.body);

  res.status(201).json({
    status: true,
    message: "Slider created successfully",
    data: slider,
  });
});

exports.updateSlider = asyncHandler(async (req, res, next) => {
  normalizeSliderPayload(req.body);

  const slider = await HomeSliderModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!slider) {
    return next(new ApiError(`No Slider found for this id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: true,
    message: "Slider updated successfully",
    data: slider,
  });
});

exports.deleteSlider = asyncHandler(async (req, res, next) => {
  const slider = await HomeSliderModel.findByIdAndDelete(req.params.id);

  if (!slider) {
    return next(new ApiError(`No Slider found for this id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: true,
    message: "Slider deleted successfully",
  });
});

exports.updateSliderBulk = asyncHandler(async (req, res) => {
  const slides = req.body;

  if (!Array.isArray(slides)) {
    return res.status(400).json({
      status: false,
      message: "Request body must be an array",
    });
  }

  const incomingIds = slides.filter((slide) => slide._id).map((slide) => slide._id);

  await HomeSliderModel.deleteMany({
    _id: { $nin: incomingIds },
  });

  await Promise.all(
    slides.map((slide) => {
      const payload = {
        img: slide.img || "",
        order: Number(slide.order) || 0,
      };

      if (slide._id) {
        return HomeSliderModel.findByIdAndUpdate(slide._id, payload, {
          new: true,
          runValidators: true,
        });
      }

      return HomeSliderModel.create(payload);
    }),
  );

  const updated = await HomeSliderModel.find({}).sort({ order: 1 });

  res.status(200).json({
    status: true,
    message: "Slider updated successfully",
    data: updated,
  });
});
