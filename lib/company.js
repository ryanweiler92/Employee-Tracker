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

const viewEmployeeNames = () => {
    connection.query(
        `SELECT first_name, last_name FROM employee`,
        function(err, results, fields) {
            return results
        }
    )
}

const viewRoleTitles = () => {
    connection.query(
        `SELECT title, id FROM role`,
        function(err, results, fields) {
            let titles = results.map( (titles) => {
                return [titles.title, titles.id].join(" ")
            })
            
        }
    )
}

// const getEmployeeById = () => {
//     const optionsPrompt = require('../index');
//     connection.query(
//         `SELECT * FROM voters WHERE id = ?`,
//        function(err, results, fields) {
//            console.table(results)
//            return optionsPrompt();
//        })
// };

// const getEmployeeByName = () => {
//      connection.query(
//         `SELECT id FROM employee WHERE first_name = `,
//         function(err, results, fields) {
//             console.table(results)
//             return results
//         })
// };



module.exports = {viewDepartments,viewRoles, viewEmployees, viewRoleTitles, viewEmployeeNames
}