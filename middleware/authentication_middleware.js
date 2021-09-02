const db = require('../database')

module.exports = (req, res, next) => {
    const token = req.headers["token"];
    const sql = `select token,username,email,id,profilepic from User where token = '${token}'`;
    db.query(sql, (err, res1) => {
        if (err) throw err;
        else {
            if (res1.length !== 0) {
                console.log(res1[0]);
                req.user = res1[0];
                next();
            }
            else{
                res.status(403).send('Token not matched')
            }

        }

    })
}

// Charlie Wilson's War