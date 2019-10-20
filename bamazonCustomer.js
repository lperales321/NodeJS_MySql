var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  getAllItems();
});

function getAllItems() {
  var query = "SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0";

  connection.query(query, function(err, res) {
    const newTable = new table;

    for(let item of res) {
        newTable.cell('Item Id', item.item_id)
        newTable.cell('Product Name', item.product_name)
        newTable.cell('Price', item.price.toFixed(2))
        newTable.newRow()
    }

    console.log(newTable.toString());

    placeOrder();
  });
}

function placeOrder() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the ID of the item you would like to buy: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to buy? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
      connection.query(query, [answer.id], function(err, res) {
        if(err) throw err;

        let productQuantity = res[0].stock_quantity;
        let productPrice = res[0].price;

        //There is not enough in stock
        if (productQuantity < answer.quantity) 
        {
          console.log("Insufficient quantity!");
        }
        else {
          let difference = productQuantity - answer.quantity;
          //Calculate total
          let total = productPrice * answer.quantity;

          var query = "UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?";
          connection.query(query, [difference, total, answer.id], function(err, res) {
            if(err) throw err;

            console.log("The total cost of your purchase is: $" + total.toFixed(2));
          });
        }

        connection.end();
      });
    });
}