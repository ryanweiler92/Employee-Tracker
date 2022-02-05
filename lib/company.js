const connection = require('../db/connection');
const optionsPrompt = require('../index.js');
const mysql = require('mysql2');

const con = mysql.createConnection(
    {host: 'localhost', user: 'root', password: 'TheNorthRemembers', database: 'company'}
)



const viewDepartments = () => {
     con.promise().query(
        `SELECT * FROM department`,
        function(err, results, fields) {
            console.table(results);
        })
        .then(() => {
            return optionsPrompt()
    })
}






module.exports = viewDepartments