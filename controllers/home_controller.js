// module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){
    
    return res.render('Home', {
        title : "Home"
    });
}