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

function addInventory() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the ID of the item you would like to increase inventory: ",
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
                message: "How many units of the product would you like to add? ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
            connection.query(query, [answer.quantity, answer.id], function(err, res) {
                if(err) throw err;
        
                console.log(answer.quantity + " units were added to Item #" + answer.id);
        
                runMenuOptions();
            });
        });
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "Enter the name of the product to add: ",
                validate: function(value) {
                    if (value !== undefined) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "departmentName",
                type: "input",
                message: "Which department does this product belong to?",
                validate: function(value) {
                    if (value !== undefined) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "price",
                type: "input",
                message: "What is the price for this product? ",
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
                message: "How many units of this product are available? ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";

            connection.query(query, [answer.productName, answer.departmentName, answer.price, answer.quantity], function(err, res) {
                if(err) throw err;
        
                console.log(answer.productName + " was added");
        
                runMenuOptions();
            });
        });
}