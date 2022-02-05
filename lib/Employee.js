const connection = require('../db/connection');

class Employee {
    constructor(first_name, last_name, role_id, employee_id) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.role_id = role_id,
        this.employee_id = employee_id
    }
    addEmployee = () => {
        const optionsPrompt = require('../index');
        connection.execute(
           `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`,
           [this.first_name, this.last_name, this.role_id],
           function(err, results, fields) {
               console.log(`Added to the database.`)
               return optionsPrompt();
           })
    };

    updateEmployee = () => {
        const optionsPrompt = require('../index');
        connection.execute(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [this.role_id, this.employee_id],
           function(err, results, fields) {
               console.log('Updated database.')
               return optionsPrompt();
           })
    }
};

module.exports = Employee;