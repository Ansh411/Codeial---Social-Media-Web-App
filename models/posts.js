const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_IMAGE_PATH = path.join('/uploads/posts/images');

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    // Include the array of ids of all comments in this post schema itself
    comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' 
    },
 ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps : true
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', POST_IMAGE_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

postSchema.statics.uploadedImage = multer({storage: storage}).single('image');
postSchema.statics.imagePath = POST_IMAGE_PATH;

const Post = mongoose.model('Post' , postSchema);

module.exports = Post;