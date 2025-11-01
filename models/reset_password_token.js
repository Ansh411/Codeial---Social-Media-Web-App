// models/reset_password_token.js

const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Token expires in 1 hour (auto-deletes)
    }
}, {
    timestamps: true
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);
module.exports = ResetPasswordToken;
