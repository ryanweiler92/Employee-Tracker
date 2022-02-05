const inquirer = require('inquirer');


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
                return viewDepartmentsPrompt();
            case 'View all roles':
                return viewAllRolesPrompt();
            case 'View all employees':
                return viewAllEmployeesPrompt();
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

const viewDepartmentsPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'test',
            message: 'this is a test',
            choices: ["test", "test2", "test3"]
        }
    ])
}

optionsPrompt();