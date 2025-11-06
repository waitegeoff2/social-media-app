const { Router } = require("express");
const uploadRouter = Router();
const passport = require("passport");
const uploadController = require('../controllers/uploadController')
const multer = require('multer');
const path = require('path');
const supabase = require('../config/supabase')

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

//upload file (save filepath to db and add to multer uploads folder)
uploadRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('file'),  uploadController.uploadFile)

module.exports = uploadRouter;