//dependiencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');

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

//global variables


//basic prompt
function runTracker() {
  console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
  console.log(``);
  console.log(`                                                          ` + chalk.greenBright.bold('Created By: Brett Fitzpatrick'));
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
          "View all Employees",
          "View all Roles",
          "View all Departments",
          "Update Employee Role"
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
        case "View all Employees":
          viewEmployee();
          break;
        case "View all Roles":
          viewRole();
          break;
        case "View all Departments":
          viewDepartment();
          break;
        case "Update Employee Role":
          findEmployee();
          break;
      }
    });
}
// functions that create data
function addEmployee () {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    let roleArray = [];
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
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
        },
        {
          type: "list",
          message: "What is the Employee's role?",
          name: "role",
          choices: roleArray
        }
      ])
      .then((response) => {
        let roleId;
        for (let j = 0; j < res.length; j++) {
          if (response.role === res[j].title) {
            roleId = res[j].id;
          }
        }
        connection.query("INSERT INTO employee SET ?",
        {
          first_name: response.first,
          last_name: response.last,
          role_id: roleId
        },
        (err) => {
          if (err) throw err;
          console.log("success");
        });
        runTracker();
      })
  })

}
function addRole () {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    let deptArray = [];
    for (let i = 0; i < res.length; i++) {
      deptArray.push(res[i].name);
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the Role?",
          name: "role"
        },
        {
          type: "input",
          message: "What is the roles salary?",
          name: "salary"
        },
        {
          type: "list",
          message: "In which Department?",
          name: "department",
          choices: deptArray
        }
      ])
      .then((response) => {
        let deptId;
        for (let j = 0; j < res.length; j++) {
          if (response.department === res[j].title) {
            deptId = res[j].id;
          }
        }
        connection.query("INSERT INTO role SET ?",
        {
          title: response.role,
          salary: response.salary,
          department_id: deptId
        },
        (err) => {
          if (err) throw err;
          console.log("success");
        })
        runTracker();
      })
  })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Department?",
        name: "department"
      }
    ])
    .then((response) => {
      connection.query("INSERT INTO department SET ?",
      {
        name: response.department
      },
      (err) => {
        if (err) throw err;
        console.log("success");
      });
      runTracker();
    })
}

//functions that read data
function viewEmployee() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;",
  (err, res) => {
    if (err) throw err;
    console.table('Employees:', res)
  });
  runTracker();
}

function viewRole() {
  connection.query("SELECT * FROM role",
  (err, res) => {
    if (err) throw err;
    console.table("Roles:", res)
  });
  runTracker();
}

function viewDepartment() {
  connection.query("SELECT * FROM department",
  (err, res) => {
    if (err) throw err;
    console.table("Departments:", res)
  });
  runTracker();
}

//functions that update
function findEmployee() {

  let employeeArray = [];
  let employeeId;


  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeArray.push(res[i].first_name + " " + res[i].last_name);
    }
    inquirer
      .prompt([
        {
          type: "list",
          message: "What Employee do you want to update?",
          name: "employee",
          choices: employeeArray
        }
      ])
      .then((response) => {
        for (let l = 0; l < res.length; l++) {
          if (response.employee === res[l].first_name + " " + res[l].last_name) {
            employeeId = res[l].id;
          }
        }
        updateRole(employeeId);
      })
  });



}

function updateRole(employeeId) {
  let roleArray = [];
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    for (let j = 0; j < res.length; j++) {
      roleArray.push(res[j].title);
      console.log(roleArray);
    }
    inquirer
      .prompt([
        {
          type: "list",
          message: "What is the Employee's new Role",
          name: "role",
          choices: roleArray
        }
      ])
      .then((response) => {
        let roleId;
        for (let k = 0; k < res.length; k++) {
          if (response.role === res[k].title) {
            roleId = res[k].id;
          }
        }
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId], (err) => {
          if (err) throw err;
          console.log("success");
        })
        runTracker();
      })
  });
}