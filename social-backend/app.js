// npm install express pg passport passport-local ejs dotenv express-validator bcryptjs passport-jwt jsonwebtoken 
const path = require("node:path");
const express = require("express");
const app = express();
const passport = require("passport");
require('dotenv').config();
require('./config/passport');
const prisma = require('./db/prisma')
const cors = require('cors');

//this allows the app to parse form data into req.
app.use(express.urlencoded({ extended: true }));

//LOOK AT THE EXPRESS CORS MIDDLEWARE NEXT TIME (https://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight)
app.use(cors())

app.use(express.json())

//static assets path (CSS, etc.)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: false }));

//telling Express to serve the uploads folder (multer uploads) as static content so React can access it
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//CURRENTUSER middleware: to allow access to currentUser in views to render the current user without having to pass it in
// insert this code somewhere between where you instantiate the passport middleware 
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//router
const indexRouter = require("./routes/indexRouter")
const loginRouter = require("./routes/loginRouter")
const postRouter = require('./routes/postRouter')
const friendsRouter = require('./routes/friendsRouter')
const uploadRouter = require('./routes/uploadRouter')
const profileRouter = require('./routes/profileRouter')

app.use("/", indexRouter)
app.use('/access', loginRouter)
app.use('/posts', postRouter)
app.use('/friends', friendsRouter)
app.use('/upload', uploadRouter)
app.use('/profile', profileRouter)


// Error middleware: Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((error, req, res, next) => {
  console.error(`Uhoh something went wrong: ${error}`);
  //with throw new Error("OH NO!");
  // You will  see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).send(error);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});