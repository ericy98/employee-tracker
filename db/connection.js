const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3Ij7#tew!-y19',
    database: 'employees'
});

connection.connect(function (err) {
    if (err) throw err;
    
});

module.exports = connection;