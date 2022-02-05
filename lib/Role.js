const connection = require('../db/connection');

class Role {
    constructor(title, salary, department_id) {
        this.title = title,
        this.salary = salary,
        this.department_id = department_id
    }
    addRole = () => {
        const optionsPrompt = require('../index');
    
        connection.execute(
           `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
           [this.title, this.salary, this.department_id],
           function(err, results, fields) {
               console.table(`Added to the database.`)
               return optionsPrompt();
           })
    };
};

module.exports = Role