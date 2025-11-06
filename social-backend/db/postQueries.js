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

async function getMaxPostsId() {
       try {
        const result = await prisma.post.aggregate({
            _max: {
                id: true,
            },
        });
        const maxId = result._max.id;
        console.log('Maximum Post ID:', maxId);
        return maxId;
    } catch (error) {
        console.error("Couldn't find user:", error);
    } 
}

async function getRecentPosts(userId) {
    try {
        //going into user's contacts and taking recent posts
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
                                    include: {
                                        author: true,
                                    },
                                },
                                likes: true,
                            },
                            orderBy: {
                                    sendTime: 'desc',
                            },
                        }, 
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
        //finding messages where the receiver is the friend
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

async function deleteLike(userId, postId) {
        let thisPost = postId
    try {
        await prisma.like.deleteMany({
            where: {
              authorId: userId,
              postId: thisPost,
            }
        })
    } catch (error) {
        console.error("Couldn't delete post:", error);
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

async function deletePost(postId) { 
    
    try {
        await prisma.post.delete({
            where: {
                id: postId,
            }
        })
    } catch (error) {
        console.error("Couldn't delete comment:", error);
    }
}

module.exports = {
    getWallPosts,
    getMaxPostsId,
    getRecentPosts,
    getFriendWallPosts,
    createPost,
    createLike,
    deleteLike,
    createComment,
    deletePost,
}