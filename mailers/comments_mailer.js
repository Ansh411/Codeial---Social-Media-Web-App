const nodeMailer = require('../config/nodemailer');

// Another way of exporting a method

exports.newComment = (comment) => {
    console.log('Inside newComment mailer');

    const htmlString = nodeMailer.renderTemplate(
        {
            comment: comment,
            commenterName: comment.user.name,
            postOwnerName: comment.post.user.name,
            postTitle: comment.post.content.substring(0, 40) + '...'
        },
        '/comments/new_comment.ejs'
    );

    nodeMailer.transporter.sendMail({
        from: 'avengershero3000@gmail.com',
        to: comment.user.email,
        subject: `Your comment on ${comment.post.user.name}’s post is live!`,
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('❌ Error in sending mail:', err);
            return;
        }
        console.log('✅ Message sent successfully', info.response);
        return;
    });
}