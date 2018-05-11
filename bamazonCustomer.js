const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("/Users/koltynpalmer/dev/class_dev/homework/node-MySQL-store-app/config/connection.js");

start();

function start() {
  console.log("Loading all products...\n");
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.log("\n \n");
    console.log("-------------------------------------------------------------------------------------------------")
    console.log("-------------------------------------------------------------------------------------------------")
    for (var i = 0; i < results.length; i++) {
      console.log("|| ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Department: " + results[i].department_name + " || Price: $" + results[i].price + " ||");
      console.log("-------------------------------------------------------------------------------------------------")
    }
    console.log("-------------------------------------------------------------------------------------------------")
    console.log("\n \n");
  });
  orderPrompt();
};


function orderPrompt() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([{
          name: 'item_id',
          type: 'input',
          message: 'Type the ID for the item you would like to purchase?'
        },
        {
          name: 'units',
          type: 'input',
          message: 'How many units would you like to order?'
        }
      ])
      .then(function (answer) {
        var selectedProduct;
        // var stock;
        var found = false;

        for (var i = 0; i < results.length; i++) {

          if ((results[i].item_id) == (answer.item_id)) {
            found = true;
            var selectedProduct = results[i];
            var name = results[i].product_name;
            var stock = results[i].stock_quantity;
            var itemID = results[i].item_id;
            console.log("\n \n")
            console.log("-------------------------------------------------------------------------------------------------")
            console.log("SELECTED product: " + name + " || SELECTED item id: " + answer.item_id);
            console.log("-------------------------------------------------------------------------------------------------")
            console.log("STOCKED product name: " + name + "quantity available: " + stock + " || STOCKED item id: " + itemID);
            console.log("-------------------------------------------------------------------------------------------------")
            console.log("\n \n")
            break;
          }
        }
        if (!found) {
          console.log("not found")
        }

        // see if product is in stock for quantity desired
        if (stock > answer.units) {
          // const inStock = nowInStock;
          var stox = parseInt(selectedProduct.stock_quantity);
          var count = parseInt(answer.units);
          var nowInStock = parseInt(stox - count);
          var sold = (parseInt(selectedProduct.sold_units)) + (parseInt(answer.units));
          // if stock then update db
          console.log("Now In Stock: " + nowInStock + " || Quantity Sold: " + sold);
          console.log("\n \n");

          connection.query(
            "UPDATE products SET ?, ? WHERE ?", [{
                stock_quantity: nowInStock
              },
              {
                sold_units: sold
              },
              {
                item_id: answer.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Order placed successfully!");
              start();
            }
          );
        } else {
          // if not in stock, give error message
          console.log("Insufficient quantity!");
          start();
        }
      });
  });
}