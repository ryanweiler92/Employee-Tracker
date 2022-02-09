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
        `SELECT role.title, role.id, department.name AS department_name, role.salary FROM role
        LEFT JOIN department ON role.department_id = department.id`,
        function(err, results, fields) {
            console.table(results)
            return optionsPrompt();
        })
};

const viewEmployees = () => {
    const optionsPrompt = require('../index');
     connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager on employee.manager_id = manager.id
        ORDER BY employee.id`,

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
};

// const getDepartmentByName = (name) => {
//      connection.query(
//         `SELECT id FROM department WHERE name = ?`,
//         [name],
//         function(err, results, fields) {
//             console.log(results)
//             const departmentId = results;
//             return departmentId
//         })
// };

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