exports.CreatePost = (req, res) => {
    const sql = `insert into post values(null, '${req.body.caption}', 0, '${req.user.id}', 0, now(),false)`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            req.files.forEach((i) => {
                console.log(i)
                const sql1 = `insert into postfiles values(null, '${i.path}', ${rows.insertId})`;
                db.query(sql1, (err, row1) => {
                    if (err) throw err;

                })
            })
            res.status(200).send('File Uploaded');
        }
    })

}

exports.DeletePost = (req, res) => {
    const sql = `delete from postfiles where post_id = ${req.params.postid}`;
    // const sql = `delete from post where id = ${req.params.postid} and author = ${req.user.id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            const sql1 = `delete from post where id = ${req.params.postid} and author = ${req.user.id}`;
            db.query(sql1, (err, row1) => {
                if (err) throw err;
                else {
                    res.status(200).send('ok :)');
                }
            })
        }
    })

}

exports.LikePost = (req, res) => {
    const params = req.params;
    console.log(req.params);
    const sql = `update post set likes = likes + 1 where id = '${req.params.postid}'`;
    const sql1 = `insert into postlikes values(null, ${req.params.postid}, ${req.user.id})`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            db.query(sql1, (err, rows1) => {
                if (err) throw err;
                else {
                    res.status(200).send('liked')
                }
            })
        }
    })

}

exports.RemoveLike = (req, res) => {
    const params = req.params;
    console.log(req.params);
    const sql = `update post set likes = likes - 1 where id = '${req.params.postid}'`;
    const sql1 = `delete from postlikes where post_id = '${req.params.postid}' and user_id = '${req.user.id}'`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        else {
            db.query(sql1, (err, rows1) => {
                if (err) throw err;
                else {
                    res.status(200).send('disliked')
                }
            })
        }
    })

}

exports.AllPosts = (req, res) => {
    var newData = []
    var newDict = {}
    const sql = `select * from post,postfiles where post.author = ${req.params.author} and post.id = postfiles.post_id`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        else {
            newDict = {
                post_id: data[0].post_id,
                files: ["http://localhost:3000/" + data[0].path],
                caption: data[0].caption,
                author: data[0].author,
                post: data[0].posted,
                likes: data[0].likes,
                comments: data[0].comment,
            }
            newData.push(newDict);
            for (let j = 1; j < data.length; j++) {
                const element = data[j];
                for (let i = 0; i < newData.length; i++) {
                    if (newData[i].post_id === element.post_id) {
                        newData[i].files.push("http://localhost:3000/" + element.path);
                    }
                    else if (i === newData.length - 1) {
                        newDict = {
                            post_id: element.post_id,
                            files: [],
                            caption: element.caption,
                            author: element.author,
                            post: element.posted,
                            likes: element.likes,
                            comments: element.comment,
                        }
                        newData.push(newDict);
                    }

                }
            }
            res.status(200).send(newData);
        }
    });
}