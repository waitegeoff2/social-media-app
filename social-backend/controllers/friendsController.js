const db = require('../db/friendsQueries')
const userDb = require('../db/loginQueries')

async function getUserFriends(req, res, next) {
    try {
            const userId = req.user.id;
            const userFriends = await db.getUserFriends(userId)
            res.json(userFriends)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function getSuggestedFriends(req, res, next) {
        try {
            const userId = req.user.id;
            const suggestedFriends = await db.getSuggestedFriends(userId)
            res.json(suggestedFriends)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function getFriendRequests(req, res, next) {
    try {
            const userId = req.user.id;
            const friendRequests = await db.getFriendRequests(userId)
            res.json(friendRequests)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function sendRequest(req, res, next) {
    try {
        const senderId = req.user.id;
        const user2email = req.body.contactEmail; //??????
        //find user 2's id with their email
        const receiverId = await db.findUserByEmail(user2email)
        
        //update both TOREQUEST AND FROMREQUEST
        await db.sendRequest(senderId, receiverId)

        res.json('Friend request sent.')
    } catch (error) {
        next(error)
    } 
}

async function sendRequestById(req, res, next) {
    try {
        const senderId = req.user.id;
        const user2Id = req.body.userId; //??????
        //find user 2's id with their email

        //update both TOREQUEST AND FROMREQUEST
        await db.sendRequest(senderId, user2Id)

        res.json('Friend request sent.')
    } catch (error) {
        next(error)
    } 
}

async function addContact(req, res, next) {
   try {
        const user1Id = req.user.id;
        const user2Id = req.body.senderId;
        const requestId = req.body.requestId;

        await db.addContact(user1Id, user2Id, requestId)
        //get updated friends list and send back to re-render
        const userinfo = await userDb.getUserDetails(user1Id)
        res.json(userinfo)
    } catch (error) {
        next(error)
    } 
}



module.exports = {
    getUserFriends,
    getSuggestedFriends,
    getFriendRequests,
    sendRequest,
    sendRequestById,
    addContact
}