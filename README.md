# Node.js & MySQL

## What the project does
This is an Amazon-like storefront app which will take in orders from customers and deplete stock from the store's inventory. It keeps track of product sales across the store's departments and provides a summary of the highest-grossing departments in the store.

## How to get started with LIRI
This app can be run by a customer, manager or supervisor.

### Customer Information
To use this app as a customer and get a list of all available products, run this command:

_node bamazonCustomer.js_

It will return the item id, product name, and price of the item.
You will be prompted to enter the ID of the item you would like to purchase. Enter the Id and hit Enter.
You will then be prompted to enter how many units of the product you would like to purchase.
You will then be given the total cost of your purchase.
In the products table, the quantity for that product will be decremented by the number of unit purchased and the product sales will be incremented by the total cost.

### Manager Information
To use this app as a manager, run this command:

_node bamazonManager.js_

It will return this menu:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Products
* exit

## View Products for Sale
This option will list every available item. It will return the item ID, name, price, and quantity.

## View Low Inventory
This option will list all items with an inventory count lower than five.

## Add to Inventory
This option will prompt the manager to choose which item to add more units to.

## Add New Products
This option will allow the manager to add a completely new product to the store. They will be prompted to enter the product name, price and quantity.


### Supervisor Information
To use this app as a supervisor, run this command:

_node bamazonSupervisor.js_

It will return this menu:
* View Product Sales by Department
* Create New Department
* exit

## View Product Sales by Department
This option will display a summarized table displaying the departement id, name, overhead costs, product sales, and total profits.
The total profits are calculated dynamically from the difference between the product sales and the overhead costs.
​
The "easy-table" package was used to format the table and make it easier to read.

## Create New Department
This option will allow the supervisor to add a completely new department to the store. They will be prompted to enter the department name and overhead costs.


### Where to get help
The GIF below will show you how to execute the commands and the results that will be returned.

![](LIRI_BOT.gif)
