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
            "View Product Sales by Department",
            "Create New Department",
            "exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
                getProductSales();
                break;

            case "Create New Department":
                //addDepartment();
                break;
                
            case "exit":
                connection.end();
                break;
        }
    });
}

function getProductSales() {
    var query = 
        "SELECT \
            d.department_id, \
            d.department_name, \
            SUM(d.over_head_costs) AS over_head_costs, \
            SUM(p.product_sales) AS product_sales, \
            SUM(p.product_sales - d.over_head_costs) AS total_profit \
        FROM bamazon.products p \
        JOIN bamazon.departments d \
        ON p.department_name = d.department_name \
        GROUP BY d.department_name";

    connection.query(query, function(err, res) {
        for(let item of res) {
            console.log("Department Id: " + item.department_id + " || Department Name: " + item.department_name + " || Overhead Costs: " + item.over_head_costs.toFixed(2) + " || Product Sales: " + item.product_sales.toFixed(2) + " || Total Profit: " + item.total_profit.toFixed(2));
        }

        runMenuOptions();
    });
}
