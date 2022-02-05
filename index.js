const inquirer = require('inquirer');
const cTable = require('console.table');
//imports functions from company.js
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
        return new Employee(answers.first_name, answers.last_name, answers.role_id).addEmployee()
    })
};

const updateEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: "Please enter the employee ID of the employee you want to update. (Required)",
            validate: employeeIdInput => {
                if (employeeIdInput) {
                    return true;
                } else {
                    console.log('No employee ID was entered.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Please enter the new role ID of the employee you want to update. (Required)",
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
        console.log(answers.employee_id)
        console.log(answers.role_id)
        return new Employee(null, null, answers.role_id, answers.employee_id).updateEmployee()
    });
};



optionsPrompt();

module.exports = optionsPrompt