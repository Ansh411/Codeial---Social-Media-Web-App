// mailers/reset_password_mailer.js

const nodemailer = require('../config/nodemailer');

exports.sendResetLink = (user, token) => {
    let htmlString = nodemailer.renderTemplate(
        { 
            user: user,
            accessToken: token.accessToken,
            isMailTemplate: true
        },
        '/users/reset_password.ejs'
    );

    nodemailer.transporter.sendMail({
        from: 'avengershero3000@gmail.com',
        to: user.email,
        subject: 'Reset your password',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error sending reset password mail:', err);
            return;
        }
        console.log('Password reset mail sent:', info.response);
    });
};
