const prisma = require('./prisma')

async function getWallPosts(userId) {
    try {
        //finding messages where the RECEIVER is that user
        const wallPosts = await prisma.post.findMany({
            where: {
                receiverId: userId,
            },
            include: {
                sender: true,
                receiver: true,
                comments: true,
                likes: true,
            },
            orderBy: {
                sendTime: 'desc',
            }
        }) 
        return wallPosts;
    } catch (error) {
        console.error("Couldn't find user:", error);
    }
}

async function createPost(senderId, receiverId, messageContent) {
    try {
        await prisma.post.create({
            data: {
              senderId: senderId,
              receiverId: receiverId,
              content: messageContent,
            }
        })
    } catch (error) {
        console.error("Couldn't find user:", error);
    }
}

async function createLike(userId, postId) {
        try {
        await prisma.like.create({
            data: {
              authorId: userId,
              postId: postId,
            },
        })
    } catch (error) {
        console.error("Couldn't like post:", error);
    }
}

async function createComment(userId, postId, content) {
        try {
        // await prisma.like.create({
        //     data: {
        //       authorId: userId,
        //       postId: postId,
        //     }
        // })
    } catch (error) {
        console.error("Couldn't create comment:", error);
    }
}

module.exports = {
    getWallPosts,
    createPost,
    createLike,
    createComment,
}