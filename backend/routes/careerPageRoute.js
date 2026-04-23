const express = require("express");
const authService = require("../services/AuthService");
const {
  getCareers,
  getPublicCareers,
  getOneCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  uploadCareerImage,
  resizeCareerImage,
} = require("../services/careerPageService");

const careerRouter = express.Router();

careerRouter.get("/public", getPublicCareers);

careerRouter
  .route("/")
  .get(getCareers)
  .post(authService.protect, uploadCareerImage, resizeCareerImage, createCareer);

careerRouter
  .route("/:id")
  .get(getOneCareer)
  .put(authService.protect, uploadCareerImage, resizeCareerImage, updateCareer)
  .delete(authService.protect, deleteCareer);

module.exports = careerRouter;
