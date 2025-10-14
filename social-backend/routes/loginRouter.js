const { Router } = require("express");
const loginRouter = Router();
const passport = require("passport");
const loginController = require('../controllers/loginController')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET; // Use a strong, environment variable for production

//add user
loginRouter.post('/newuser', loginController.addUser)

//log in
loginRouter.post(
      "/login",
  passport.authenticate("local", { session: false, failWithError: true }), (req, res) => {
    console.log(req.user)
    const payload = { id: req.user.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    console.log(token)
    return res.status(200).json({ message: 'Login successful', token: token });
    // If authentication succeeds, generate token
});

//get details about current user after logging in
loginRouter.get('/user', passport.authenticate('jwt', { session: false }), loginController.getUserDetails)

module.exports = loginRouter;