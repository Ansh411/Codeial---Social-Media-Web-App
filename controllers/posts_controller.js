const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    
    try{
      let post = await Post.create({
        content : req.body.content,
        user : req.user._id
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
    }
    catch(err){
        req.flash('error',err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports.destroy = async function(req , res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            req.flash('success', 'Post & ass ociated comments Deleted!');

            return res.redirect('/');
        }
        else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('/');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('/');
    }

}