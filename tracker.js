//dependiencies
const mysql = require('mysql');
const inquirer = require('inquirer');

//make connection
const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'Steelwatt90!',

  database: 'employee_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  runTracker();
});

//basic prompt
function runTracker() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select Action',
        name: 'action',
        choices: [
          "Add Employee",
          "Add Role",
          "Add Department",

        ]
      }
    ])
    .then((response) => {
      switch (response.action) {
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
      }
    });
}

function addEmployee () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Employee's first name?",
        name: "first"
      },
      {
        type: "input",
        message: "What is the Employee's last name?",
        name: "last"
      }
    ])
    .then((response) => {

    })
}