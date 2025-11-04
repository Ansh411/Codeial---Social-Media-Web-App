const Friendship = require('../models/friendship');
const User = require('../models/user');

// Send a friend request

module.exports.addFriend = async function(req, res){
    try{
        // const toUser = await User.findById(req.params.id);
        // if(!toUser){
        //     return res.status(404).json({
        //         message: 'User not found'
        //     });
        // }

        // check if friendship exists
        const existing = await Friendship.findOne({
            $or: [
            {from_user: req.user._id, to_user: req.params.id},
            {from_user: req.params.id, to_user: req.user._id}
            ]
        });
        
        if(existing){
            return res.status(400).json({
                message: 'Friend request already exists!'
            });
        }

        await Friendship.create({
            from_user: req.user._id,
            to_user: req.params.id,
            status: 'pending'
        });

        return res.status(200).json({
            message: 'Friend request sent!',
            success: true
        });
    } catch(err) {
        console.log('Error sending request: ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Accept a friend request

module.exports.acceptRequest = async function(req, res){
    try{
        const friendship = await Friendship.findOne({
            from_user: req.params.id,
            to_user: req.user._id,
            status: 'pending'
        });

        if(!friendship){
            return res.status(404).json({
                message: 'No pending request found'
            });
        }

        friendship.status = 'accepted';
        await friendship.save();

        return res.status(200).json({
            message: 'Friend Request Accepted!',
            success: true
        });
    } catch(error){
        console.log('Error accepting request: ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Decline Friend Request

module.exports.declineRequest = async function (req, res){
    try{
        const friendship = await Friendship.findOneAndDelete({
            from_user: req.params.id,
            to_user: req.user._id,
            status: 'pending'
        });

        if(!friendship){
            return res.status(404).json({
                message: 'No pending request found !'
            });
        }

        return res.status(200).json({
            message: 'Friend request declined !'
        });
    }catch(err){
        console.error('Error declining request: ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Remove friend 

module.exports.removeFriend = async function (req, res){
    try{
        const friendship = await Friendship.findOneAndDelete({
            $or: [
                {from_user: req.user._id, to_user: req.params.id, status: 'accepted'},
                {from_user: req.params.id, to_user: req.user._id, status: 'accepted'}
            ]
        });

        if(!friendship){
            return res.status(404).json({
                message: 'No friendship found'
            });
        }
        

        return res.status(200).json({
            message: 'Friend removed successfully',
            data: {deleted: true}
        });
    } catch (err) {
        console.log('Error removing friend: ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};