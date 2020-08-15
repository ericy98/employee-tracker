const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    getAllDept() {
        return this.connection.promise().query(
            `SELECT * FROM department;`
        );
    }
    getAllRoles() {
        return this.connection.promise().query(
            `SELECT * FROM roles;`
        );
            
    }
    getAllEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name 
            AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) 
            AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id 
            LEFT JOIN department on roles.department_id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id;`
            
        );
    }
    addDeptartment(department) {
        return this.connection.promise().query(
            `INSERT INTO department SET ?`, 
            department
        );
    }
    addNewRole(role) {
        return this.connection.promise().query(
            `INSERT INTO roles SET ?`, 
            role
        )
    }
    addNewEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?`, 
            employee
        )
    }
    updateEmployeeRole() {

    }
}

module.exports = new DB(connection);