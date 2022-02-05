const connection = require('../db/connection');

class Employee {
    constructor(first_name, last_name, role_id) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.role_id = role_id
    }
    addEmployee = () => {
        const optionsPrompt = require('../index');
    
        connection.execute(
           `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`,
           [this.first_name, this.last_name, this.role_id],
           function(err, results, fields) {
               console.table(`Added to the database.`)
               return optionsPrompt();
           })
    };
};

module.exports = Employee;