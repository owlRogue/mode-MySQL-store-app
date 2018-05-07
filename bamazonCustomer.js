const connection = require("/Users/koltynpalmer/dev/class_dev/homework/node-MySQL-store-app/config/connection.js");
const mysql = require("mysql");
const inquirer = require("inquirer");
let allresults;

start();

function start() {
    console.log("Loading all products...\n");
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {

        allres = (res[i]);
        itemIds = allres.item_id;
        productNames = allres.product_name;
        departmentNames = allres.department_name;
        itemPrice = allres.price;

        console.log("\n" + "|| ID: " + itemIds + " || Product: " + productNames + " || Department: " + departmentNames + " || Price: $" + itemPrice + " ||");
      }
      orderPrompt();
    });
  }

function orderPrompt() {
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
        }
      ])
    .then(function(answer) {
        console.log("|| Item ID: "+answer.item_id+" || Product Name: "+allres.product_name+" ||");  
        console.log("Total: " + answer.units * itemPrice);
        connection.query(
            "REPLACE INTO products SET ? ",
            {
                item_id: answer.item_id,
                // stock_quantity: stock_quantity - answer.units,
                sold_units: answer.units
                
            },
            function(err) {
                if (err) throw err;
                console.log("Your ordered was not placed successfully...");
                
                console.log("Insufficienct quantity remaining");

                console.log("Your ordered was placed successfully!");
          
            start();
          }
        );
    });
    }


    
    // || ID: 5 || Product: Solmate Socks || Department: clothing || Price: $12.54 ||

    // || ID: 6 || Product: 2018 Burton Step-In Bindings || Department: sports || Price: $109.39 ||
    
    // || ID: 7 || Product: Pair of Thieves Socks || Department: clothing || Price: $12 ||
    
    // || ID: 8 || Product: Sunwarrior Classic Vegan Protein 16oz || Department: grocery || Price: $35.99 ||
    
    // || ID: 9 || Product: HeliHuman G+Drone || Department: electronics || Price: $9999.99 ||

// || ID: 10 || Product: Hermione's Time Turner || Department: enchanted || Price: $1357.91 ||

// || ID: 11 || Product: Bag of Holding || Department: enchanted || Price: $2468.02 ||
// ? What is the ID for the item you would like to purchase? 3
// ? How many units would you like to order? 1
// || Item ID: 3 || Product Name: Bag of Holding ||
// Total: 2468.02
// Your ordered was not placed successfully...
// Insufficienct quantity remaining
// Your ordered was placed successfully!
// Loading all products...
