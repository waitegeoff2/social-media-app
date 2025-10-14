const db = require('../db/postQueries')

async function getWallPosts(req, res, next) {
    try {
        const userId = req.user.id;
        const posts = await db.getPosts(userId)
        res.json(posts)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function createPost(req, res, next) {
    try {
        const senderId = req.user.id;
        const receiverId = req.body.currentWall;
        const messageContent = req.body.messageContent;
        await db.createPost(senderId, receiverId, messageContent)
        res.json('Post created.')
    } catch(error){
        console.error(error);
        next(error);
    }
}

module.exports = {
    getWallPosts,
    createPost,
}