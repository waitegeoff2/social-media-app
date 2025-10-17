const prisma = require('./prisma');

async function getUserFriends(userId) {
    try {
        const userFriends = await prisma.user.findMany({
            where: {
                id: userId,
            },
            select: {
                contacts: true,
            }
        }) 
        return userFriends;
    } catch (error) {
        console.error("Couldn't find user:", error);
    }  
}

async function getSuggestedFriends(userId) {
    try {
        //find the users and select their contacts so you can exclude the ones who are friends with the user already (or have pending request)
        const suggestedUsers = await prisma.user.findMany({
            include: {
                contacts: true,
                requestto: true,
                requestfrom: true,
            }
        }) 
        return suggestedUsers;
    } catch (error) {
        console.error("Couldn't find user:", error);
    } 
}

async function getFriendRequests(userId) {
    try {
        const sentRequests = await prisma.request.findMany({
            where: {
                requestfromId: userId,
            },
            include: {
                requestto: true,
            }
        })

        const receivedRequests = await prisma.request.findMany({
            where: {
                requesttoId: userId,
            },
            include: {
                requestfrom: true,  
            }
        })
        return { sentRequests, receivedRequests }

    } catch(error) {
        console.error("Couldn't find contact requests: ", error);
    }
}

async function findUserByEmail(userEmail) {
    try {
        const user2Id = await prisma.user.findUnique({
            where: {
                username: userEmail,
            },
            select: {
                id: true,
            }
        }) 
        return user2Id.id;
    } catch (error) {
        console.error("Couldn't find user:", error);
    }
}

async function sendRequest(senderId, receiverId) {
    try {
        await prisma.request.create({
            data: {
                requestfromId: senderId,
                requesttoId: receiverId,
            }
        }) 
    } catch (error) {
        console.error("Couldn't find user:", error);
    }
}

async function addContact(user1Id, user2Id, requestId) {
    //add to each other's contacts
    try {
        await prisma.user.update({
            where: {
                id: user1Id,
            },
            data: {
                contacts: {
                    connect: {
                        id: user2Id,
                    }
                }
            }
        })
    } catch(error) {
        console.error("Couldn't add contact: ", error);
    }

    //connect user2 to user1 also to be safe
    try {
        await prisma.user.update({
            where: {
                id: user2Id,
            },
            data: {
                contacts: {
                    connect: {
                        id: user1Id,
                    }
                }
            }
        })
    } catch(error) {
        console.error("Couldn't add contact: ", error);
    }

    //Delete this request
    try {
        await prisma.request.delete({
            where: {
                id: requestId,
            }
        })
    } catch(error) {
        console.error("Couldn't delete request: ", error);
    }
}



module.exports = {
    getUserFriends,
    getSuggestedFriends,
    getFriendRequests,
    findUserByEmail,
    sendRequest,
    addContact,
}