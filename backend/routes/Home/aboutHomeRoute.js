const express = require("express");
const authService = require("../../services/AuthService");

const {
  getAboutHome,
  updateAboutHome,
  parseAboutBody,
} = require("../../services/Home/aboutHomeService");

const aboutHomeRouter = express.Router();

aboutHomeRouter
  .route("/")
  .get(getAboutHome)
  .put(authService.protect, parseAboutBody, updateAboutHome);

module.exports = aboutHomeRouter;
