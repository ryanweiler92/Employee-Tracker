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
        console.log(answers)
        let departmentName = answers.department_name
          connection.query(
               `SELECT id FROM department WHERE name = ?`,
               [departmentName],
               function(err, results, fields) {    
                   const departmentId = results;
                   return new Role(answers.title, answers.salary, departmentId[0].id).addRole()
        })
    })
    }
)}




const addEmployeePrompt = () => {
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
            type: 'input',
            name: 'role_id',
            message: "Please enter the ID of the role that this employee corresponds to. (Required)",
            validate: roleIdInput => {
                if (roleIdInput) {
                    return true;
                } else {
                    console.log('No role ID was entered.');
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        console.log(answers.first_name, answers.last_name, answers.role_id)
        return new Employee(answers.first_name, answers.last_name, answers.role_id).addEmployee()
    })
};

const updateEmployeePrompt = () => {
    //query database for employee names and destructure into an array.
    connection.query(`SELECT first_name, last_name FROM employee`,
    function(err, results, fields) {
        let names = results.map( (names) => {
            return [names.first_name, names.last_name].join(" ");
        })
        console.log(names)
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