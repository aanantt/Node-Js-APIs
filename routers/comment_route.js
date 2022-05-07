const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication_middleware');
const CommentController = require('../controllers/comment_controllers.js')


router.get('/comment/:postid', isAuthenticated, CommentController.GetComments)

router.post('/comment/:postid', isAuthenticated, CommentController.PostComment)

router.delete('/comment/:commentid/:postid', isAuthenticated, CommentController.DeleteComment)

module.exports = router;

