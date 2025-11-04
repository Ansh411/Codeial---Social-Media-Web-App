// module.exports.actionName = function(req,res){}

const Friendship = require('../models/friendship');
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
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'name email'
        }
    }).populate({
        path: 'comments',
        populate: {
            path: 'likes'
        }
    })
    .populate('likes');

    let users = await User.find({});

    let friends = [];
    if(req.user){
        friends = await Friendship.find({
            $or: [
                {from_user: req.user._id, status: 'accepted'},
                {to_user: req.user._id, status: 'accepted'}
            ]
        })
        .populate('from_user', 'name email avatar')
        .populate('to_user', 'name email avatar');
    }

    return res.render('Home', {
        title : "Codeial | Home",
        posts,
        all_users : users,
        friends
    });
    }
    catch(err){
        console.log('Error in home controller' , err);
        return;
    }
};