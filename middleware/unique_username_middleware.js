const db = require('../database')

 

module.exports = (req, res, next) => {
    username = req.body.username;
    const sql = `select exists (select 1 from User where username = '${username}') as bool_val`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            if (rows[0].bool_val === 1) {
                res.status(403).send('Username Already Exists ;)')
            }
            else {
                next();
            }

        }
    })

}