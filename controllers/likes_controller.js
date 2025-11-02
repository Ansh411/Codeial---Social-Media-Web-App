const Like = require('../models/like');
const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try{

        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if already like exists
        let exisitngLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if a like already exists then delete it
        if(exisitngLike){
            likeable.likes.pull(exisitngLike._id);
            likeable.save();

            exisitngLike.remove();
            deleted = true;
        }
        else{
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({
            message: 'Request Successful',
            data: { deleted: deleted }
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}