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

  runMenuOptions();
});

function runMenuOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        getAllProducts();
        break;

      case "View Low Inventory":
        getLowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
}

function getAllProducts() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0";

    connection.query(query, function(err, res) {
        for(let item of res) {
            console.log("Item Id: " + item.item_id + " || Product Name: " + item.product_name + " || Price: " + item.price.toFixed(2) + " || Quantity: " + item.stock_quantity);
        }

        runMenuOptions();
    });
}

function getLowInventory() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";

    connection.query(query, function(err, res) {
        for(let item of res) {
            console.log("Item Id: " + item.item_id + " || Product Name: " + item.product_name + " || Price: " + item.price.toFixed(2) + " || Quantity: " + item.stock_quantity);
        }

        runMenuOptions();
    });
}