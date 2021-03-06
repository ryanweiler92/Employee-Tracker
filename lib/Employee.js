const connection = require('../db/connection');

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.role_id = role_id,
        this.manager_id = manager_id

    }
    addEmployee = () => {
        const optionsPrompt = require('../index');
        connection.execute(
           `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
           [this.first_name, this.last_name, this.role_id, this.manager_id],
           function(err, results, fields) {
               console.log(`Added to the database.`)
               return optionsPrompt();
           })
    };

    updateEmployee = () => {
        const optionsPrompt = require('../index');
        connection.execute(
            `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`,
            [this.role_id, this.first_name, this.last_name],
           function(err, results, fields) {
               console.log('Updated database.')
               return optionsPrompt();
           })
    }
};

module.exports = Employee;