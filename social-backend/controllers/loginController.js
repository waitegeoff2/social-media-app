const db = require('../db/loginQueries')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")

//add more as needed
const emptyErr = "is required"
const lengthErr = "must be between 1 and 50 characters."
const emailErr = "must be formatted like an email."
const pwMatchErr = "Passwords do not match"

const validateUser = [
    body("name").trim()
    .notEmpty().withMessage(`Full name ${emptyErr}`)
    .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`),
    body("username").trim()
    .isLength({ min: 1, max: 50 }).withMessage(`Full name ${lengthErr}`)
    .isEmail().withMessage(`Email ${emailErr}`), 
    body('password')
    .notEmpty().withMessage(`Password ${emptyErr}`)
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('confirmpassword')
        .notEmpty().withMessage(`Confirm Password ${emptyErr}`)
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(`${pwMatchErr}`);
            }
            return true;
        }),
]

const addUser = [
validateUser,
async(req, res, next) => {
    //display errors if any
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors); //returns an errors array that you can map on the frontend
    }

//if valid, put values into db
    try {
        console.log(req.body)
        const user = req.body;
        const name = req.body.name;
        const birthday = req.body.birthday;
        const dateOnly = birthday;
        const birthdayDateTime = new Date(`${dateOnly}T00:00:00Z`);
        const username = req.body.username;
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addUser(name, username, birthdayDateTime, hashedPassword);

        res.json(true);
    } catch(error){
        console.error(error);
        next(error);
    }
}
]

async function getUserDetails(req, res, next) {
    try {
        const userId = req.user.id;
        const userDetails = await db.getUserDetails(userId)
        res.json(userDetails)
    } catch(error){
        console.error(error);
        next(error);
    }
}

async function getFriendDetails(req, res, next) {
    try {
        const userId = parseInt(req.params.friendId);
        console.trace(userId)
        const friendDetails = await db.getFriendDetails(userId)
        res.json(friendDetails)
    } catch(error){
        console.error(error);
        next(error);
    }
}

module.exports = {
    addUser,
    getUserDetails,
    getFriendDetails
}