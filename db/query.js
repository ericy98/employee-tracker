const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    getAllDept() {

    }
    getAllRoles() {

    }
    getAllEmployees() {
        return this.connection.promise().query(
            
        )
    }
    addDept() {

    }
    addRole() {

    }
    addEmployee() {

    }
    updateEmployeeRole() {

    }
}

module.exports = new DB(connection);