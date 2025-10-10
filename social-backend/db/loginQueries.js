const prisma = require('./prisma');

//register a user
async function addUser(fullName, userName, age, bio, password) {
    await prisma.user.create({
        data: {
            name: fullName,
            username: userName,
            age: age,
            bio: bio,
            password: password
        }
    })
}

module.exports = {
    addUser,
}