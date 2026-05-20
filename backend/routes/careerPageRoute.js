const express = require("express");
const authService = require("../services/AuthService");
const {
  getCareers,
  getPublicCareers,
  getOneCareer,
  getCareerStatistics,
  createCareer,
  updateCareer,
  deleteCareer,
  getCareerApplicationForm,
  updateCareerApplicationForm,
  submitCareerApplication,
  getCareerApplications,
  exportCareerApplications,
  getCareerApplication,
  updateCareerApplicationStatus,
  getCareerTemplates,
  createCareerTemplate,
  uploadCareerImage,
  resizeCareerImage,
  uploadApplicationFiles,
} = require("../services/careerPageService");

const careerRouter = express.Router();

careerRouter.get("/public", getPublicCareers);

careerRouter.get("/applications", authService.protect, getCareerApplications);
careerRouter.get(
  "/applications/export",
  authService.protect,
  exportCareerApplications,
);

careerRouter
  .route("/templates")
  .get(authService.protect, getCareerTemplates)
  .post(authService.protect, createCareerTemplate);

careerRouter.get("/statistics", authService.protect, getCareerStatistics);

careerRouter
  .route("/applications/:applicationId")
  .get(authService.protect, getCareerApplication)
  .put(authService.protect, updateCareerApplicationStatus);

careerRouter
  .route("/")
  .get(getCareers)
  .post(
    authService.protect,
    uploadCareerImage,
    resizeCareerImage,
    createCareer,
  );

careerRouter
  .route("/:id")
  .get(getOneCareer)
  .put(authService.protect, uploadCareerImage, resizeCareerImage, updateCareer)
  .delete(authService.protect, deleteCareer);

careerRouter
  .route("/:id/application-form")
  .get(getCareerApplicationForm)
  .put(authService.protect, updateCareerApplicationForm);

careerRouter.post("/:id/apply", uploadApplicationFiles, submitCareerApplication);

module.exports = careerRouter;
