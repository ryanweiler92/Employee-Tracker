const inquirer = require('inquirer');
const cTable = require('console.table');
//imports functions from company.js
const company = require('./lib/company');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

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
            type: 'input',
            name: 'department_id',
            message: "Please enter the ID of the department that this role corresponds to. (Required)",
            validate: departmentIdInput => {
                if (departmentIdInput) {
                    return true;
                } else {
                    console.log('No department ID was entered.');
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        return new Role(answers.title, answers.salary, answers.department_id).addRole()
    })
};




optionsPrompt();

module.exports = optionsPrompt