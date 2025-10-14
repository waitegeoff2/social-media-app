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

module.exports = {
    getWallPosts,
    createPost,
}