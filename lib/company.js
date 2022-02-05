const connection = require('../db/connection');
const mysql = require('mysql2');


const viewDepartments = () => {
    const optionsPrompt = require('../index');
     connection.query(
        `SELECT * FROM department`,
        function(err, results, fields) {
            console.table(results)
            return startAgain();
        })
};






module.exports = viewDepartments