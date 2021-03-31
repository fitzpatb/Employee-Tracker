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

//global variables


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
          "Add Department"
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
          choices: [roleArray]
        }
      ])
      .then((response) => {
        let roleId;
        for (let j = 0; j < res.length; j++) {
          if (response.role === res[j].title) {
            roleId = res[j].title;
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
        })
      })
  })

}