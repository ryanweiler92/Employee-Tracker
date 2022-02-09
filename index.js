const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

const company = require('./lib/company');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee')


//the inital prompt that allows users to perform actions
const optionsPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
        }
    ])
    .then((answers) => {
        switch (answers.options) {
            case 'View all departments':
                return company.viewDepartments();
            case 'View all roles':
                return company.viewRoles();
            case 'View all employees':
                return company.viewEmployees();
            case 'Add a department':
                return addDepartmentPrompt();
            case 'Add a role':
                return addRolePrompt();
            case 'Add an employee':
                return addEmployeePrompt();
            case 'Update an employee role':
                return updateEmployeePrompt();
            case 'Exit':
                return;
        };
    });
};

const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please enter the name of the department (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('No department name was entered.');
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        return new Department(answers.name).addDepartment()
       
    });
};

const addRolePrompt = () => {
    connection.query(`SELECT name FROM department`,
    function(err, results, fields) {
        let names = results.map( (names) => {
            return [names.name].join(" ")
        });
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Please enter the title of the role. (Required)",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('No role title was entered.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "Please enter the salary of the role. (Required)",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('No salary was entered.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department_name',
            message: "Please select the department that this role corresponds to. (Required)",
            choices: names
        }
    ])
    .then((answers) => {
        let departmentName = answers.department_name
          connection.query(
               `SELECT id FROM department WHERE name = ?`,
               [departmentName],
               function(err, results, fields) {    
                   console.log(results)
                   const departmentId = results;
                   return new Role(answers.title, answers.salary, departmentId[0].id).addRole()
        })
    })
    }
)}




const addEmployeePrompt = () => {
    connection.query(`SELECT title from ROLE`,
    function (err, results, fields) {
        let titles = results.map( (titles) => {
            return [titles.title].join(" ")
        })
        const employeeNames = connection.query(
            `SELECT manager.first_name, manager.last_name FROM employee
            LEFT JOIN employee AS manager on employee.manager_id = manager.id`,
            function(err, results, fields) {
                let names = results.map( (names) => {
                    return [names.first_name, names.last_name].join(" ");
            })
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the first name of the employee. (Required)",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('No first name was entered.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the last name of the employee. (Required)",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('No last name was entered.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role_title',
            message: "Please select the title of the role that this employee corresponds to. (Required)",
            choices: titles
        },
        {
            type: 'list',
            name: 'manager_name',
            message: "Please select the manager that the employee reports to",
            choices: names
        }

    ])
    .then((answers) => {
        console.log(answers)
        let roleTitle = answers.role_title
        let managerName = answers.manager_name.split(" ")
        let firstName = managerName[0].toString()
        let lastName = managerName[1].toString()
        console.log(firstName + " " + lastName)
        console.log(roleTitle)
        connection.query(
            `SELECT (SELECT id FROM role WHERE title = ?)
            (SELECT id FROM employee WHERE first_name = ? AND last_name = ?)  `,
            ([roleTitle],[firstName, lastName]),
            function(err, results, fields) {
                console.log(results)
                const roleId = results[0]
                const managerId = results[1]
                return new Employee(answers.first_name, answers.last_name, roleId[0].id,).addEmployee()
            }) 
        })
    })
    })
};

const updateEmployeePrompt = () => {
    //query database for employee names and destructure into an array.
    connection.query(`SELECT first_name, last_name FROM employee`,
    function(err, results, fields) {
        let names = results.map( (names) => {
            return [names.first_name, names.last_name].join(" ");
        })
        const roleResults = connection.query(
            `SELECT title, id FROM role`,
            function(err, results, fields) {
                let titles = results.map( (titles) => {
                    return [titles.title, titles.id].join(" ")
            })   

    return inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: "Please select the employee you want to update. (Required)",
            choices: names
        },
        {
            type: 'list',
            name: 'role_id',
            message: "Please select the new role for the employee. (Required)",
            choices: titles
        }
    ])
    .then((answers) => {
        const name = answers.name.split(" ")
        const firstName = name[0]
        const lastName = name[1]
        const role = answers.role_id.split(" ")
        const roleId = role.pop()

        return new Employee(firstName, lastName, roleId).updateEmployee()
        })
        }
    )}
)};


optionsPrompt();

module.exports = optionsPrompt