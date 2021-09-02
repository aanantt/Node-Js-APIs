const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication_middleware');
const db = require('../database')


// get all followers of a user
router.get('/followers/:id', isAuthenticated, (req, res) => {
    const sql = `select followers from follow where following = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
})

// get all following of a user
router.get('/following/:id', isAuthenticated, (req, res) => {
    const sql = `select following from follow where followers = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
})

//follow a user
router.post('/follow/:id', isAuthenticated, (req, res) => {
    const sql = `insert into follow values(null,${req.user.id}, ${id})`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
})

//unfollow a user
router.post('/unfollow/:id', isAuthenticated, (req, res) => {
    const sql = `delete from follow where followers = ${req.user.id} and following = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
})

// I believe that my experience with mobile app development, specifically with Flutter, REST APIs and Firebase, make me the best match for this position. I am always eager to learn new technology. I have built my apps with Flutter, some of which are on Play store and others are on my Github profile.