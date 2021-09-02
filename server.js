const express = require('express')
const app = express()
const user_router = require('./routers/user_route')
const post_router = require('./routers/post_route')
const comment_router = require('./routers/comment_route')
const mobile = require('./routers/mobilesignin')
const db = require('./database')
const reply_router = require('./routers/reply_route')
app.use("/profile", express.static("profile"))
app.use("/post", express.static("post"))
app.use(express.urlencoded());
app.use(express.json());

app.listen(3001, () => {
    console.log('connected at 3000');
    const user_sql = "create table if not exists User (token varchar(100),name varchar(100),email varchar(100),username varchar(100), password varchar(100), id int primary key auto_increment, joined datetime, profilepic varchar(100))";
    const file_sql = "create table if not exists postfiles (id int primary key auto_increment, path varchar(200), post_id int, foreign key(post_id) references post(id))";
    const like_sql = "create table if not exists postlikes (id int primary key auto_increment, post_id int, user_id int, foreign key(post_id) references post(id), foreign key(user_id) references User(id))";
    const follow = "create table if not exists follow (id int primary key auto_increment, followers int, following int, foreign key(followers) references User(id),foreign key(following) references User(id))"
    const comment_sql = "create table if not exists comment (id int primary key auto_increment, comment varchar(20), likes int,author int,post_id int,posted_at datetime, foreign key(author) references User(id), foreign key(post_id) references post(id))";
    const post_sql = "create table if not exists post (id int primary key auto_increment, caption varchar(20), likes int,author int,comment int,posted datetime, haslike boolean, foreign key(author) references User(id))";
    db.query(`${user_sql};${post_sql};${file_sql};${comment_sql};${like_sql};${follow}`, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    });
    // You can remove these lines of code after 1st run (npm run dev)
});
app.set('view engine', 'ejs')
app.use(user_router.router);
app.use(post_router);
app.use(comment_router);
app.use(reply_router);
app.use(mobile);
