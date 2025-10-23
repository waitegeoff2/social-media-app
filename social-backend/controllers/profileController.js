const db = require('../db/profileQueries')

async function updateProfile(req, res, next) {
    try {
        const userId = req.user.id
        const bio = req.body.bio
        //add more as needed
        console.trace(bio) 
        await db.updateProfile(userId, bio)
        res.json('Details updated.')
    } catch (error) {
        next(error)
    } 
}

module.exports = {
    updateProfile,
}