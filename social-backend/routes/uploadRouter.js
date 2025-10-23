const { Router } = require("express");
const uploadRouter = Router();
const passport = require("passport");
const uploadController = require('../controllers/uploadController')
const multer = require('multer');
const path = require('path');
const supabase = require('../config/supabase')

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//       }
// });

const upload = multer({ storage: storage });

//upload file (save filepath to db and add to multer uploads folder)
uploadRouter.post('/', upload.single('file'),  uploadController.uploadFile)

module.exports = uploadRouter;