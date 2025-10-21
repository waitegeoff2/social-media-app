const { Router } = require("express");
const friendsRouter = Router();
const passport = require("passport");
const friendsController = require('../controllers/friendsController')

//routes to get details about friends, friend requests and other users

//route to get a list of this users' friends
friendsRouter.get('/', passport.authenticate('jwt', { session: false }), friendsController.getUserFriends)
//get friend requests sent to this user
friendsRouter.get('/sentrequests', passport.authenticate('jwt', { session: false }),  friendsController.getFriendRequests)
//get random friends who user is NOT friends with. Select 10 random friends to populate suggested friends
friendsRouter.get('/suggestedfrogs', passport.authenticate('jwt', { session: false }),  friendsController.getSuggestedFriends)

//FRIEND REQUESTS
//send a friend request to that person. Going to enter email and FIND USER by that email. then put a friend request in their user model. 
    //chatRoomRouter.post('/:contactId')
friendsRouter.post('/requestfriend', passport.authenticate('jwt', { session: false }),  passport.authenticate('jwt', { session: false }), friendsController.sendRequest)
friendsRouter.post('/requestfriendbyid', passport.authenticate('jwt', { session: false }),  passport.authenticate('jwt', { session: false }), friendsController.sendRequestById)


//if friend request is accepted, add friend. try this with jwt tokens
friendsRouter.post('/addfriend', passport.authenticate('jwt', { session: false }),  passport.authenticate('jwt', { session: false }), friendsController.addContact)



module.exports = friendsRouter