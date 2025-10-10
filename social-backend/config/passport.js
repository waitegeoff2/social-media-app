//putting all the passport stuff here and then making it available in the app
const passport = require("passport");
//import your prisma client into here
const prisma = require("../db/prisma");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
//JWT imports
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = process.env.JWT_SECRET; // Use a strong, environment variable for production
require('dotenv').config();

//PASSPORT PASSWORD/COOKIE FUNCTIONS (UPDATE)
//passport middleware - match un and pw
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        //find user details
        const user = await prisma.user.findFirst({
        where: {
            username: username,
        },
        });
        console.log(user)
        //if user not in database
        if (!user) {
            console.log('no user');
            return done(null, false, { message: "Incorrect username" });
        }  
        //define match 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("wrong password!")
            return done(null, false, { message: "Incorrect password" })
        }
        //if successful, return the user
        console.log('logged in!')
        console.log(user)
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

//JWT strategy for token verification
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

//verification strategy. get the user and return it
passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirst({
        where: {
            id: jwt_payload.id,
        },
        }); // Assuming payload contains user ID
    if (user) {
      console.trace(user)
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));
