module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title : "User Profile"
    })
}

// renders the sign up page

module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title : "Codeial | Sign up"
    })
}

// renders the sign in page

module.exports.signIn = function(req,res){
    return res.render('user_sign_in', {
        title : "Codeial | Sign in"
    })
}