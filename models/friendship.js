const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // the user who accepts the request
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    }
},{
    timestamps: true
}
);

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;