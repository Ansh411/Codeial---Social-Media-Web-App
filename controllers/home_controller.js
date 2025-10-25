// module.exports.actionName = function(req,res){}

const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);

    // Post.find({}, function(err, posts){
    //     return res.render('Home', {
    //     title : "Codeial | Home",
    //     posts : posts
    // });
    // });

    // Populate the user of each post

    try{
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    let users = await User.find({});

    return res.render('Home', {
        title : "Codeial | Home",
        posts : posts,
        all_users : users
    });
    }
    catch(err){
        console.log('Error' , err);
        return;
    }

}