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
        type: 'input',
        message: 'looks like this is working',
        name: 'success'
      }
    ])
    .then((response) => {
      console.log('success')
    })
}