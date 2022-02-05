const connection = require('../db/connection');

class Department {
    constructor(name) {
        this.name = name
    }

    addDepartment = () => {
        const optionsPrompt = require('../index');
    
         connection.execute(
            `INSERT INTO department (name) VALUES (?)`,
            [this.name],
            function(err, results, fields) {
                console.table(`Added to the database.`)
                return optionsPrompt();
            })
    };
};

module.exports = Department