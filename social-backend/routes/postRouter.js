const { Router } = require("express");
const postRouter = Router();
const passport = require("passport");
const postController = require('../controllers/postController')

//get wall posts for a specific friend
postRouter.get('/:friendId', passport.authenticate('jwt', { session: false }), postController.getFriendWallPosts)
//get the user's wall posts
postRouter.get('/', passport.authenticate('jwt', { session: false }), postController.getWallPosts)
postRouter.get('/index', passport.authenticate('jwt', { session: false }), postController.getRecentPosts)
postRouter.post('/createpost', passport.authenticate('jwt', { session: false }), postController.createPost)
postRouter.post('/createlike', passport.authenticate('jwt', { session: false }), postController.createLike)
postRouter.post('/createcomment', passport.authenticate('jwt', { session: false }), postController.createComment)


module.exports = postRouter;