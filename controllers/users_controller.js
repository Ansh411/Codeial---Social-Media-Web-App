const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id , function(err, user){
        return res.render('user_profile', {
        title : "User Profile",
        profile_user : user
    });
 });
}

module.exports.update = async function(req,res){
   /* if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , function(err , user){
            req.flash('success', 'Updated!');
            return res.redirect('/');
        });
    }
    */
   if(req.user.id == req.params.id){
    try{

        let user = await User.findById(req.params.id);

        User.uploadedAvatar(req, res, function(err){
            if(err){
                console.log('****Multer Error: ',err);
            }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        const avatarPath = path.join(__dirname, '..' , user.avatar);
                        if(fs.existsSync(avatarPath)){
                            fs.unlinkSync(avatarPath);
                        }
                    }
                    // This is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile updated successfully!');
                return res.redirect(`/users/profile/${req.user.id}`);
        });

    }catch(err){
        console.log('Error:', err);
        req.flash('error',err);
        return res.redirect('/');
    }
   }
    else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
};

// renders the sign up page

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title : "Codeial | Sign up"
    })
}

// renders the sign in page

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title : "Codeial | Sign in"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err,user){
        if(err){
           req.flash('error', err);
            return;
        }

        if(!user){
            User.create(req.body , function(err,user){
                if(err){
                    req.flash('error', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    })
}

// Sign in and create a session for the user

module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully !');
    return res.redirect('/');
}

// Sign out and destroy the current session

module.exports.destroySession = function(req,res,next){
req.logout(function(err) {
  if (err) { 
    return next(err); 
}
  req.flash('success', 'You have been logged out !');
  return res.redirect('/');
});
}