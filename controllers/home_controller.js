// module.exports.actionName = function(req,res){}

const Post = require('../models/posts');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);

    // Post.find({}, function(err, posts){
    //     return res.render('Home', {
    //     title : "Codeial | Home",
    //     posts : posts
    // });
    // });

    // Populate the user of each post

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('Home', {
        title : "Codeial | Home",
        posts : posts
    });
    })
};