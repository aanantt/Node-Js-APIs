const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication_middleware');
const db = require('../database')
const FollowControllers = require("../controllers/follow_controllers.js")

// get all followers of a user
router.get('/followers/:id', isAuthenticated, FollowControllers.AllFollowers)

// get all following of a user
router.get('/following/:id', isAuthenticated, FollowControllers.AllFollowing)

//follow a user
router.post('/follow/:id', isAuthenticated, FollowControllers.Follow)

//unfollow a user
router.post('/unfollow/:id', isAuthenticated, FollowControllers.Following)

// I believe that my experience with mobile app development, specifically with Flutter, REST APIs and Firebase, make me the best match for this position. I am always eager to learn new technology. I have built my apps with Flutter, some of which are on Play store and others are on my Github profile.