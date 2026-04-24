const express = require("express");
const { searchWebsite } = require("../services/searchService");

const searchRouter = express.Router();

searchRouter.get("/", searchWebsite);

module.exports = searchRouter;
