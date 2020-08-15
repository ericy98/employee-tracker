// const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/query');
require('console.table');

function listOfPrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select an option.',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'viewDepts'
                },
                {
                    name: 'View All Roles',
                    value: 'viewRoles'
                },
                {
                    name: 'View All Employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add a Department',
                    value: 'addDept'
                },
                {
                    name: 'Add a Role',
                    value: 'addRole'
                },
                {
                    name: 'Add an Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update an Employee Role',
                    value: 'updateRole'
                },
                {
                    name: 'Quit Application',
                    value: 'quit'
                }
            ]
        }
    ]).then(res => {
        const choice = res.choice;

        switch (choice) {
            case 'viewDepts':
                viewDepts();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmployees();
                break;
            case 'addDept':
                addDept();
                break;
            case 'addRole':
                addRole();
                break;
            case 'addEmployee':
                addEmployee();
                break;
            case 'updateRole':
                updateRole();
                break;
            case 'quit':
                quit();
                break;
        }
    })
};

function viewDepts() {
    db.getAllDept()
        .then(([rows, fields]) => {
            const departments = rows;
            console.table(departments);
        })
        .then(() => listOfPrompts());
};

function viewRoles() {
    db.getAllRoles()
        .then(([rows, fields]) => {
            const roles = rows;
            console.table(roles);
        })
        .then(() => listOfPrompts());
};

function viewEmployees() {
    db.getAllEmployees()
        .then(([rows, fields]) => {
            const employee = rows;
            console.table(employee)
        })
        .then(() => listOfPrompts());
};

function addDept() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: 'What department would you like to add?'
        }
    ])
        .then(res => {
            const name = res;
            db.addDeptartment(name)
                .then(() => console.log(`Added ${name.name} to list of departments!`))
                .then(() => listOfPrompts())
        })
};

function addRole() {
    db.getAllDept()
        .then(([rows]) => {
            const departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'text',
                    name: 'title',
                    message: "Please add the role's name."

                },
                {
                    type: 'text',
                    name: 'salary',
                    message: "What is the role's salary?"
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "What department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.addNewRole(role)
                        .then(() => console.log(`Successfully added ${role.title}!`))
                        .then(() => listOfPrompts())
                })
        });
};


function addEmployee() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            name: 'last_name',
            message: "What is the employee's last name?"
        }
    ])
        .then(res => {
            const firstName = res.first_name;
            const lastName = res.last_name;

            db.getAllRoles()
                .then(([rows]) => {
                    const roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    inquirer.prompt({
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            const roleId = res.roleId;

                            db.getAllEmployees()
                                .then(([rows]) => {
                                    const employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));
                                    managerChoices.unshift({ name: "none", value: null });

                                    inquirer.prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            const employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }
                                            db.addNewEmployee(employee);
                                        })
                                        .then(() => listOfPrompts())
                                })
                        })
                })
        })



};

function updateRole() {
    db.getAllEmployees()
        .then(([rows]) => {
            const employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.getAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => listOfPrompts())
                        });
                });
        })
};

function quit() {
    console.log("See you later!");
    process.exit();
}

listOfPrompts();
