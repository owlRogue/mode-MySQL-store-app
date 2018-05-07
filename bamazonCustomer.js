var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;

  displayAll();
//   runSearch();
});

function displayAll() {
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price);
      }
      runSearch();
    });
  }


function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Enter a product ID to add it to your cart",
        "How many units would you like to purchase?"
        // "Find all artists who appear more than once",
        // "Find data within a specific range",
        // "Search for a specific song",
        // "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find product by literal name":
        productSearch();
        break;

    //   case "Find all artists who appear more than once":
    //     multiSearch();
    //     break;

    //   case "Find data within a specific range":
    //     rangeSearch();
    //     break;

    //   case "Search for a specific song":
    //     songSearch();
    //     break;

    //   case "Find artists with a top song and top album in the same year":
    //     songAndAlbumSearch();
    //     break;
      }
    });
}

function productSearch() {
    inquirer
      .prompt({
        name: "product_name",
        type: "input",
        message: "Enter literal product name to search:"
      })
      .then(function(answer) {
        var query = "SELECT product_name, department_name, price FROM products WHERE ?";
        connection.query(query, { product_name: answer.product_name }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price);
          }
          runSearch();
        });
      });
  }


  