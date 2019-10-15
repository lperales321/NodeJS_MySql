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
    });

    connection.end();
}