const db = require('../db/postQueries')

async function getWallPosts(req, res, next) {
    try {
        const userId = req.user.id;
        const posts = await db.getWallPosts(userId)
        res.json(posts)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function getFriendWallPosts(req, res, next) {
    try {
        //USER ID IS NOT JWT ANYMORE
        const userId = parseInt(req.params.friendId)
        const posts = await db.getWallPosts(userId)
        res.json(posts)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function createPost(req, res, next) {
    try {
        const senderId = req.user.id;
        const receiverId = req.body.currentUser.id;
        const messageContent = req.body.statusContent;
        await db.createPost(senderId, receiverId, messageContent)
        res.json('Post created.')
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function deletePost(req, res, next) {
try {
        // const senderId = req.user.id;
        // const receiverId = req.body.currentUser.id;
        // const messageContent = req.body.statusContent;
        // await db.createPost(senderId, receiverId, messageContent)
        // res.json('Post created.')
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function createLike(req, res, next) {
    try {
        const userId = req.user.id;
        const postId = req.body.postId;
        const newLikes = await db.createLike(userId, postId)
        res.json('Like added.')
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function createComment(req, res, next) {
    try {
        const userId = req.user.id;
        const postId = req.body.postId;
        const content = req.body.commentContent;
        await db.createComment(userId, postId, content)
        res.json('comment created')
    } catch(error){
        console.error(error);
        next(error);
    }
}

module.exports = {
    getWallPosts,
    getFriendWallPosts,
    createPost,
    deletePost,
    createLike,
    createComment
}