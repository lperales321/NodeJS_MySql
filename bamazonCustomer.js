var mysql = require("mysql");
var inquirer = require("inquirer");

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
  var query = "SELECT item_id, product_name, price FROM products";

  connection.query(query, function(err, res) {
    for(let item of res) {
      console.log("Item Id: " + item.item_id + " || Product Name: " + item.product_name + " || Price: " + item.price.toFixed(2));
    }

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

          var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
          connection.query(query, [difference, answer.id], function(err, res) {
            if(err) throw err;

            //Calculate total
            let total = productPrice * answer.quantity;
            console.log("The total cost of your purchase is: $" + total);
          });
        }

        connection.end();
      });
    });
}