const multer = require("multer");
const ApiError = require("../utils/apiError");

const createMulter = ({ fileFilter } = {}) =>
  multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
      fieldSize: 5 * 1024 * 1024,
      fileSize: 10 * 1024 * 1024,
    },
  });

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
    return;
  }

  cb(new ApiError("Only Images are allowed", 400), false);
};

const attachmentFileFilter = (req, file, cb) => {
  const blockedMimeTypes = [
    "application/x-msdownload",
    "application/x-dosexec",
    "application/x-sh",
    "application/x-bat",
    "application/x-executable",
  ];
  const blockedExtensions = [".exe", ".bat", ".cmd", ".sh", ".msi", ".com"];
  const originalName = (file.originalname || "").toLowerCase();

  if (
    blockedMimeTypes.includes(file.mimetype) ||
    blockedExtensions.some((extension) => originalName.endsWith(extension))
  ) {
    cb(new ApiError("This file type is not allowed", 400), false);
    return;
  }

  cb(null, true);
};

exports.uploadSingleImage = (fieldName) =>
  createMulter({ fileFilter: imageFileFilter }).single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  createMulter({ fileFilter: imageFileFilter }).fields(arrayOfFields);

exports.uploadSingleFile = (fieldName) =>
  createMulter({ fileFilter: attachmentFileFilter }).single(fieldName);

exports.uploadAnyFile = () =>
  createMulter({ fileFilter: attachmentFileFilter }).any();
