const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');
const passport = require('passport');

// To display profile section in the footer profile link
router.get('/profile', passport.checkAuthentication, function(req, res){
    return res.redirect(`/users/profile/${req.user.id}`);
});

router.get('/profile/:id' ,passport.checkAuthentication, userController.profile);
router.post('/update/:id' ,passport.checkAuthentication, userController.update);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create' , userController.create);

router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
) , userController.createSession)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;