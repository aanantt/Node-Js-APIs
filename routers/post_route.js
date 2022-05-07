const express = require('express')
const router = express.Router()
const multer = require('multer')
const isAuthenticated = require('../middleware/authentication_middleware');
// const storage = require('../middleware/cloudinary')
// var upload = multer({ storage: storage })
const PostController = require('../controllers/post_controllers.js')
// create a "post"
router.post('/post', isAuthenticated, PostController.CreatePost)
// router.post('/post', isAuthenticated, upload.array('images', 4), PostController.CreatePost)

// delete a post
router.delete('/delete/:postid', isAuthenticated, PostController.DeletePost)

// like a post
router.post('/like/:postid', isAuthenticated, PostController.LikePost)

//dislike a post
router.delete('/removelike/:postid', isAuthenticated, PostController.RemoveLike)

// get all post of a user
router.get('/post/:author', isAuthenticated, PostController.AllPosts)

module.exports = router;