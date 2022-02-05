const mysql = require('mysql2');

//Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'TheNorthRemembers',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

module.exports = connection;