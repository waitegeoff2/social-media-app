const { Router } = require("express");
const postRouter = Router();
const passport = require("passport");
const postController = require('../controllers/postController')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET; // Use a strong, environment variable for production

postRouter.get('/', passport.authenticate('jwt', { session: false }), postController.getWallPosts)
postRouter.post('/createpost', passport.authenticate('jwt', { session: false }), postController.createPost)

module.exports = postRouter;