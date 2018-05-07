var connection = require("/Users/koltynpalmer/dev/class_dev/homework/node-MySQL-store-app/config/connection.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

start();

function start() {
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        var allres = res[i];
        var itemIds = allres.item_id;
        console.log("\n" + "|| ID: " + itemIds + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " ||");
      }
      orderPrompt();
    });
  }

// function to handle purchasing new items
function orderPrompt() {
    // prompt for which products are available for purchase
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "What is the ID for the item you would like to purchase?"
        },
        {
          name: "units",
          type: "input",
          message: "How many units would you like to order?"
        },
        // {
        //   name: "startingBid",
        //   type: "input",
        //   message: "What would you like your starting bid to be?",
        //   validate: function(value) {
        //     if (isNaN(value) === false) {
        //       return true;
        //     }
        //     return false;
        //   }
        // }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products_sold SET ? ",
          {
              item_id: answer.item_id,
              units_sold: answer.units
          },
          function(err) {
            if (err) throw err;
            console.log("Your ordered was placed successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }

//   (SELECT product_name FROM products JOIN products_sold ON products.item_id = products_sold.item_id)