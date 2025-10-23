const { Router } = require("express");
const uploadRouter = Router();
const passport = require("passport");
const uploadController = require('../controllers/uploadController')

module.exports = uploadRouter;