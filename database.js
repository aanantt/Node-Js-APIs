const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'workwithapi.cqq63wcmk2cn.ap-south-1.rds.amazonaws.com',
    user: 'workwithapi',
    password: 'workwithapi',
    // multipleStatements: true,
    database: 'workwithapi',
    port:3306
})

db.connect((err) => {
    console.log("Database connected")
});
// const db = mysql.createConnection({
//     host: 'workwithapi.cqq63wcmk2cn.ap-south-1.rds.amazonaws.com',
//     user: 'workwithapi',
//     password: 'workwithapi',
//     // multipleStatements: true,
//     // database: 'workwithapi',
//     port:3306
// })
// const { Client } = require('pg');

// const db = new Client({
//     user: 'vetuynhg',
//     host: 'chunee.db.elephantsql.com',
//     database: 'vetuynhg',
//     multipleStatements: true,
//     password: 'qtH1YfyLAIziziROAWXBw0LBeVeZEzTU',
//     port: 5432,
// });

// db.connect();
module.exports = db;