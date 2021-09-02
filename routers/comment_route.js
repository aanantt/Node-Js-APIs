const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication_middleware');
const db = require('../database')

router.get('/comment/:postid', (req, res) => {
    const sql = `select comment.id, username, profilepic, comment, likes from User, comment where comment.post_id = ${req.params.postid} and comment.author = User.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            res.status(200).json(
                rows.map(row => {
                    return {
                        id: row.id,
                        username: row.username,
                        profilepic: "http://localhost:3000/" + row.profilepic,
                        comment: row.comment,
                        likes: row.likes
                    }

                })
            );
        }
    })
})

router.post('/comment/:postid', isAuthenticated, (req, res) => {
    const sql = `insert into comment values(null, '${req.body.comment}', 0,'${req.user.id}', '${req.params.postid}', now())`;
    const sql1 = `update post set comment = comment + 1 where id = '${req.params.postid}'`;
    db.query(sql, (err, rows1) => {
        if (err) throw err;
        else {
            db.query(sql1, (err1, rows) => {
                if (err1) throw err1;
                else {
                    res.status(201).send("Posted")
                }
            })
        }
    })
})
router.delete('/comment/:commentid/:postid', (req, res) => {
    const sql = `delete from comment where id = ${req.params.commentid}`;
    const sql1 = `update post set comment = comment-1 where id = ${req.params.postid}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            db.query(sql1, (err1, rows1) => {
                if (err1) throw err1;
                else {
                    res.status(200).send('deleted');
                }
            })
        }
    })
})
module.exports = router;

