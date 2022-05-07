const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const Crypto = require('node-crypt');
const email = require('../email.js')

const crypto = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});

const { v1: uuidv1, } = require('uuid');
const multer = require('multer')
const isAuthenticated = require('../middleware/authentication_middleware');
const check_if_exist = require('../middleware/unique_username_middleware');
const db = require('../database')
const salt = bcrypt.genSaltSync(10);


// var upload = multer({ storage: storage })

const UserController = require("../controllers/user_controllers.js")
router.post('/login', UserController.LogIn)

router.post('/signup', check_if_exist, UserController.SignUp)

router.get('/verify/:token', UserController.VerifyToken)

router.put('/upload/profilepic', isAuthenticated, UserController.UploadProfile)
// router.put('/upload/profilepic', isAuthenticated, upload.single('avatar'), UserController.UploadProfile)

router.post('/change/password', isAuthenticated, UserController.ChangePassword)

router.post('/change/username', [isAuthenticated, check_if_exist], UserController.ChangeUsername

)
module.exports = {
    router, db
}

