const prisma = require('./prisma');

//update profile details
async function updateProfile(userId, bio) {
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                bio: bio,
            }
        })
    } catch (error) {
        console.error("Couldn't update bio:", error);
    }
}

module.exports = {
    updateProfile,
}