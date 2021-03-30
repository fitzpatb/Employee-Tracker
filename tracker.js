//dependiencies
const mysql = require('mysql');

//make connection
const connection = mysql.createConnection({
  host: 'localhost',

  port: 8080,

  user: 'root',

  password: 'Steelwatt90!',

  database: 'employee_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  runTracker();
});