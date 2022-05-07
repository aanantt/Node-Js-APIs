exports.AllFollowers = (req, res) => (req, res) => {
    const sql = `select followers from follow where following = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
}

exports.AllFollowing = (req, res) => {
    const sql = `select following from follow where followers = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
}

exports.Follow = (req, res) => {
    const sql = `insert into follow values(null,${req.user.id}, ${id})`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
}

exports.Following = (req, res) =>  {
    const sql = `delete from follow where followers = ${req.user.id} and following = ${id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.status(200).send(rows)
        }
    })
}