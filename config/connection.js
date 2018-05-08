var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  // if (err) throw err;
    return("connected as id " + connection.threadId);
});

module.exports = connection;
