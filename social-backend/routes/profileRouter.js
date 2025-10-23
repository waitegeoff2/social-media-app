const { Router } = require("express");
const profileRouter = Router();
const profileController = require('../controllers/profileController')
const passport = require("passport");
require('../config/passport');

//routes for user's to update their personal profile (bio, display pic, etc.)

//update profile
profileRouter.post('/update', passport.authenticate('jwt', { session: false }), profileController.updateProfile)

module.exports = profileRouter;