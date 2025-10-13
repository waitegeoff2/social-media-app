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

module.exports = {
    addUser,
}