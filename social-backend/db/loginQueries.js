const prisma = require('./prisma');

//register a user
async function addUser(fullName, userName, birthday, password) {
    await prisma.user.create({
        data: {
            name: fullName,
            username: userName,
            birthday: birthday,
            password: password
        }
    })
}

async function getUserDetails(userId) {
    try {
        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        return userDetails;
    } catch(error) {
        console.error("Couldn't find user details: ", error);
    }
}

module.exports = {
    addUser,
    getUserDetails,
}