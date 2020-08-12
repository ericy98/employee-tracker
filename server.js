// const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/query');
require('console.table');

function listOfPrompts() {
    inquirer.prompt ([   
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
        .then (([rows, fields]) => {
            const employee = rows;
            console.table(employee)
        })
        .then(() => listOfPrompts());
};

function addDept() {

};

function addRole() {

};

function addEmployee() {

};

function updateRole() {

};

function quit() {
    console.log("See you later!");
    process.exit();
  }

listOfPrompts();
