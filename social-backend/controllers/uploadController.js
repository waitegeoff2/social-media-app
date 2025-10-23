const db = require('../db/uploadQueries')
require('dotenv').config();
const supabase = require('../config/supabase')



async function uploadFile(req, res, next) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`; // Unique filename
    const bucketName = process.env.SUPABASE_BUCKET_NAME; // Replace with your Supabase bucket name
    const filePath = `public/${fileName}`; // Path within the bucket

    const userId = req.user.id;

    try {
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, fileBuffer, {
                contentType: req.file.mimetype,
                upsert: false // Set to true if you want to overwrite existing files
            });

        if (error) {
            console.error('Error uploading file to Supabase:', error);
            return res.status(500).send('Error uploading file.');
        }

        // Construct the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        await db.uploadFile(userId, publicUrlData.publicUrl)

        res.status(200).json({ message: 'File uploaded successfully!', url: publicUrlData.publicUrl });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error.');
    }
}

//OLD ONE
// async function uploadFile(req, res, next) {
//     try {
//         console.log(req.file);
//         const userId = req.user.id;
//         //check that this works
//         const filePath = `/uploads/${req.file.filename}`;
//         console.trace(filePath)
//         console.trace(userId)
//         //ADD TO DB
//         await db.uploadFile(userId, filePath)
//         //so you can update your profile pic state
//         res.json('Pic uploaded')
//     } catch (error) {
//         next(error)
//     } 
// }


module.exports = {
    uploadFile,
}