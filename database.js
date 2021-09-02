const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    multipleStatements: true,
    database: 'nodejs'
})

db.connect((err) => {
    console.log("Database connected")
});
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