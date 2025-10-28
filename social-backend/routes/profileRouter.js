const { Router } = require("express");
const profileRouter = Router();
const profileController = require('../controllers/profileController')
const passport = require("passport");
require('../config/passport');

//update profile
profileRouter.post('/update', passport.authenticate('jwt', { session: false }), profileController.updateProfile)

module.exports = profileRouter;