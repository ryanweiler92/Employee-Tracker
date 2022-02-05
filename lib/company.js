const connection = require('../db/connection');

const viewDepartments = () => {
    const optionsPrompt = require('../index');
     connection.query(
        `SELECT * FROM department`,
        function(err, results, fields) {
            console.table(results)
            return optionsPrompt();
        })
};

const viewRoles = () => {
    const optionsPrompt = require('../index');
     connection.query(
        `SELECT * FROM role`,
        function(err, results, fields) {
            console.table(results)
            return optionsPrompt();
        })
};

const viewEmployees = () => {
    const optionsPrompt = require('../index');
     connection.query(
        `SELECT * FROM employee`,
        function(err, results, fields) {
            console.table(results)
            return optionsPrompt();
        })
};


module.exports = {viewDepartments,viewRoles, viewEmployees
}