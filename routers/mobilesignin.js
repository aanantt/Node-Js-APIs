const express = require('express')
const router = express.Router()
const redis = require("redis");
const bcrypt = require('bcrypt');
const { v1: uuidv1, } = require('uuid');
const client = redis.createClient();
const db = require('../database')
const MobileController = require('../controllers/mobileSignIn_controllers.js')

client.on('connect', function () {
    console.log('Redis Connected!');
});


router.post('/sign/mobile', MobileController.MobileSignIn)

router.post('/otp/verify', MobileController.VerifyOTP)


module.exports = router;