const express = require("express");
const authService = require("../../services/AuthService");

const {
  createOurService,
  deleteOurService,
  getOneOurService,
  getOurServices,
  getPublicOurServices,
  updateOurService,
  uploadServiceBannerImage,
  resizeServiceBannerImage,
} = require("../../services/Service/ourService");

const ourServiceRouter = express.Router();

// Public
ourServiceRouter.get("/public", getPublicOurServices);

// Admin
ourServiceRouter
  .route("/")
  .get(getOurServices)
  .post(
    authService.protect,
    uploadServiceBannerImage,
    resizeServiceBannerImage,
    createOurService,
  );

ourServiceRouter
  .route("/:id")
  .get(getOneOurService)
  .put(
    authService.protect,
    uploadServiceBannerImage,
    resizeServiceBannerImage,
    updateOurService,
  )
  .delete(authService.protect, deleteOurService);

module.exports = ourServiceRouter;
