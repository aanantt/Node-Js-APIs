const bcrypt = require('bcrypt');
const Crypto = require('node-crypt');
const email = require('../email.js')
const db = require('../database.js')
const salt = bcrypt.genSaltSync(10);
const crypto = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});

const { v1: uuidv1, } = require('uuid');
exports.LogIn = (req, res) => {
    const username = req.body.username;
    console.log(req.body);
    const sql = `select password,token from User where username = '${username}'`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            if (bcrypt.compareSync(req.body.password, rows[0].password)) {
                res.status(200).json({ token: rows[0].token })
            }
            else {
                res.status(403).send('Wrong Password');
            }

        }
    })
}

exports.SignUp = (req, response) => {
    const token = uuidv1();
    const hash = bcrypt.hashSync(req.body.password, salt);
    const sql = `INSERT INTO User VALUES ('${token}', '${req.body.name}', '${req.body.email}', '${req.body.username}', '${hash}',null, now(), "profile/image.jpeg");`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        else {
            const verifytoken = res.insertId + "/" + req.body.username + "/" + token;
            const verifyhash = crypto.encrypt(verifytoken);
            console.log(res.insertId);
            response.status(201).json({
                token: token,
                hash: verifyhash,
            });
            email(req.body.email, verifyhash);
        }
    })
}

exports.VerifyToken = (req, res) => {
    const values = crypto.decrypt(req.params.token).split('/');
    const sql = `update User set verified = 1 where id = ${values[0]}`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(res);
            res.status(200).send('Account Verified!!! :D');
        }
    })
}

exports.UploadProfile = (req, res) => {
    const sql = `update User set profilepic = '${req.file.path}' where username = '${req.user.username}'`;
    console.log(req.file.path);
    console.log(req.user)
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            res.status(200).send(rows);
        }
    })

}

exports.ChangePassword = (req, res) => {
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const hash = bcrypt.hashSync(new_password, salt);
    const old_token = req.user.token;
    const new_token = uuidv1();
    const sql = `select password from User where token = '${old_token}'`;
    const update = `update User set password = '${hash}', token = '${new_token}' where token = '${old_token}'`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            if (bcrypt.compareSync(old_password, rows[0].password)) {
                // if password are same update BOTH token and password 
                // so that other logged in device can't access anything.
                db.query(update, (err, rows1) => {
                    if (err) throw err;
                    else {
                        res.status(200).json({
                            token: new_token
                        })
                    }
                })
            }
        }
    })



}

exports.ChangeUsername = (req, res) => {
    const username = req.body.username;
    console.log(req.user);
    const sql = `update User set username = '${username}' where id = ${req.user.id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            res.status(200).send('Username Updated Successfully');
        }
    })

}