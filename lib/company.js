class Company {


    viewAllDepartments() {
        console.log('this is working')
        fetch('/api/departments', {
            method: 'GET',
        })
        .then((res) => console.table(res))
    }
};


module.exports = Company;