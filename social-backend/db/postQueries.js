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
                comments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        author: true,
                    },
                    //GET THESE IN DESCENDING ORDER
                },
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

async function getRecentPosts(userId) {
    try {
        //SEE IF THIS WORKS
        const recentPosts = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                contacts: {
                    include: {
                        postfrom: {
                            // take max of 10 recents posts per user
                            take: 10,
                            include: {
                                sender: true,
                                receiver: true,
                                comments: { 
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                },
                                likes: true,
                            },
                            orderBy: {
                                    sendTime: 'desc',
                            },
                        }, // Include all messages received by this friend
                    },
                
            },
        },
        }) 
        return recentPosts;
    } catch (error) {
        console.error("Couldn't find user:", error);
    }
}

async function getFriendWallPosts(userId) {
    try {
        //finding messages where the RECEIVER is that user
        const wallPosts = await prisma.post.findMany({
            where: {
                receiverId: userId,
            },
            include: {
                sender: true,
                receiver: true,
                comments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        author: true,
                    },
                    //GET THESE IN DESCENDING ORDER
                },
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
        //probably not a necessary line
        let thisPost = postId
    try {
        await prisma.like.create({
            data: {
              authorId: userId,
              postId: thisPost,
            }
        })
    } catch (error) {
        console.error("Couldn't like post:", error);
    }
}

async function createComment(userId, postId, content) { 
    let thisPost = postId
    
    try {
        await prisma.comment.create({
            data: {
              authorId: userId,
              postId: thisPost,
              content: content,
            }
        })
    } catch (error) {
        console.error("Couldn't create comment:", error);
    }
}

module.exports = {
    getWallPosts,
    getRecentPosts,
    getFriendWallPosts,
    createPost,
    createLike,
    createComment,
}