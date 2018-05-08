const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("/Users/koltynpalmer/dev/class_dev/homework/node-MySQL-store-app/config/connection.js");

start();

function start() {
  console.log("Loading all products...\n");
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log("\n" + "|| ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Department: " + results[i].department_name + " || Price: $" + results[i].price + " ||");
    }
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
        var stock;
        var found = false;
        console.log("answer.item_id: " + answer.item_id)

        for (var i = 0; i < results.length; i++) {
          console.log("stocked item id: " + results[i].item_id);
          console.log("selected item id: " + answer.item_id);
          if (results[i].item_id == answer.item_id) {
            found = true;
            selectedProduct = results[i];
            name = results[i].product_name;
            stock = results[i].stock_quantity;
            itemID = results[i].item_id;
            console.log("name: " + name + " || stock: " + stock);
            break;
          }
        }
        if (!found) {
          console.log("not found")
        };

        // see if product is in stock for quantity desired
        if (stock > answer.units) {
          // const inStock = nowInStock;
          var nowInStock = ((parseInt(selectedProduct.stock_quantity)) - (parseInt(answer.units)));
          var sold = ((parseInt(answer.units)) + (parseInt(selectedProduct.sold_units)));
          // if stock then update db
          console.log("nowInStock " + nowInStock);
          console.log("sold: " + sold);
          connection.query(
            "UPDATE products SET ? AND ? WHERE ?", [{
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