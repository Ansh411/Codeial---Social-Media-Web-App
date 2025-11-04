const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendshipController = require('../controllers/friendship_controller');

// send a request

router.get('/add-friend/:id', passport.checkAuthentication, friendshipController.addFriend);

// accept a request

router.get('/accept-request/:id', passport.checkAuthentication, friendshipController.acceptRequest);

// decline request

router.get('/decline-request/:id', passport.checkAuthentication, friendshipController.declineRequest);

// remove a friend

router.get('/remove-friend/:id', passport.checkAuthentication, friendshipController.removeFriend);

module.exports = router;