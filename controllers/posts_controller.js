const Post = require('../models/posts');
const Comment = require('../models/comment');
const Like = require('../models/like');
const fs = require('fs');
const path = require('path');

module.exports.create = async function(req, res){
    
    try{
    
    await Post.uploadedImage(req, res, async function(err){
        if(err){
            console.log('Multer Error: ', err);
        }

        let post = await Post.create({
        content : req.body.content,
        user : req.user._id,
        image: req.file ? Post.imagePath + '/' + req.file.filename : ''
    });

    if(req.xhr){
        // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        post = await post.populate('user', 'name');
        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post Created!"
        });
    }

     req.flash('success', 'Post Published!');
     return res.redirect('/');
    });
}
catch(err){
        req.flash('error',err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports.destroy = async function(req , res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            await Comment.deleteMany({post : req.params.id});

            if(post.image && fs.existsSync(path.join(__dirname, '..', post.image))){
                fs.unlinkSync(path.join(__dirname, '..', post.image));
                console.log('Image Deleted: ', post.image);
            }

            await post.deleteOne();

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            req.flash('success', 'Post & associated comments Deleted!');

            return res.redirect('/');
        }
        else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('/');
        }
    }
    catch(err){
        console.error('Error deleting post: ',err);
        req.flash('error','Internal Server Error');
        return res.redirect('/');
    }

}