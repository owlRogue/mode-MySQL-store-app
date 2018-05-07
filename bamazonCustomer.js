const connection = require("/Users/koltynpalmer/dev/class_dev/homework/node-MySQL-store-app/config/connection.js");
const mysql = require("mysql");
const inquirer = require("inquirer");
let allresults

start();

function start() {
    console.log("Loading all products...\n");
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
        // if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {

        allres = JSON.stringify(res[i]);
            console.log(allres);
        itemIds = allres.item_id;
        productNames = allres.product_name;

        console.log("\n" + "|| ID: " + itemIds + " || Product: " + productNames + " || Department: " + res[i].department_name + " || Price: $" + res[i].price + " ||");
      }

      orderPrompt();
    });
  }

// function to handle purchasing new items
function orderPrompt() {
    // prompt for which products are available for purchase
    inquirer
      .prompt(
        {
          name: "item_id",
          type: "input",
          message: "What is the ID for the item you would like to purchase?"
        },
        {
          name: "units",
          type: "input",
          message: "How many units would you like to order?"
        }
    )
    .then(function(answer) {
        connection.query(
            
            "UPDATE products SET ??? WHERE stock_quantity > ? ",
            {
                item_id: answer.item_id,
                stock_quantity: res.stock_quantity - answer.units,
                sold_units: res.sold_units + answer.units
                
            },
            function(err) {
            if (err) throw err;
                console.log("Insufficienct quantity remaining");
                console.log("|| Item ID: "+answer.item_id+" || Product Name: "+res.product_name+" ||");  
                console.log("Total: " + answer.units * res.price);
                console.log("Your ordered was placed successfully!");
          

            // re-prompt the user for if they want to bid or post
            start();
          }
        );
    });
    }
