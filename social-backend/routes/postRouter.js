const { Router } = require("express");
const postRouter = Router();
const passport = require("passport");
const postController = require('../controllers/postController')


//get the user's wall posts
postRouter.get('/recent', passport.authenticate('jwt', { session: false }), postController.getRecentPosts)
//get wall posts for a specific friend
postRouter.get('/:friendId', passport.authenticate('jwt', { session: false }), postController.getFriendWallPosts)
postRouter.get('/', passport.authenticate('jwt', { session: false }), postController.getWallPosts)
postRouter.post('/createpost', passport.authenticate('jwt', { session: false }), postController.createPost)
postRouter.post('/createlike', passport.authenticate('jwt', { session: false }), postController.createLike)
postRouter.post('/createcomment', passport.authenticate('jwt', { session: false }), postController.createComment)


module.exports = postRouter;