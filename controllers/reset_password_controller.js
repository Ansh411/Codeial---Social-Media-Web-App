// controllers/reset_password_controller.js

const User = require('../models/user');
const ResetPasswordToken = require('../models/reset_password_token');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');

module.exports.renderForgotPassword = function(req, res) {
    return res.render('users/forgot_password', {
        title: "Forgot Password"
    });
};

module.exports.sendResetLink = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('error', 'No account found with that email.');
            return res.redirect('back');
        }

        let token = await ResetPasswordToken.create({
            user: user._id,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        });

        resetPasswordMailer.sendResetLink(user, token);
        req.flash('success', 'Password reset link sent to your email.');
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('Error in sending reset link:', err);
        req.flash('error', 'Error sending reset link.');
        return res.redirect('back');
    }
};

module.exports.renderResetPassword = async function(req, res) {
    try {
        let token = await ResetPasswordToken.findOne({ accessToken: req.params.accessToken }).populate('user');
        if (!token || !token.isValid) {
            req.flash('error', 'Invalid or expired link.');
            return res.redirect('/users/sign-in');
        }

        return res.render('users/reset_password', {
            title: "Reset Password",
            accessToken: req.params.accessToken,
            user: token.user,
            isMailTemplate: false
        });
    } catch (err) {
        console.log('Error rendering reset password:', err);
        req.flash('error', 'Something went wrong.');
        return res.redirect('/users/sign-in');
    }
};

module.exports.updatePassword = async function(req, res) {
    try {
        let token = await ResetPasswordToken.findOne({ accessToken: req.params.accessToken });

        if (!token || !token.isValid) {
            req.flash('error', 'Invalid or expired token.');
            return res.redirect('/users/sign-in');
        }

        if (req.body.new_password !== req.body.confirm_password) {
            req.flash('error', 'Passwords do not match.');
            return res.redirect(`/users/reset-password/${req.params.accessToken}`);
        }

        let user = await User.findById(token.user);
        user.password = req.body.new_password;
        await user.save();

        token.isValid = false;
        await token.save();

        req.flash('success', 'Password successfully updated. Please sign in.');
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('Error updating password:', err);
        req.flash('error', 'Could not reset password.');
        return res.redirect('/users/sign-in');
    }
};
