DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT,
    stock_quantity INTEGER
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Sunglasses', 'Accessories', 50.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Sweatshirt', 'Clothing', 45.00, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Laptop', 'Computers', 600.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pressure Cooker', 'Kitchen', 65.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Dog Food', 'Pets', 30.90, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Dyson Hair Dryer', 'Beauty', 399.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cricut', 'Arts and Crafts', 369.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pink Floyd Vinyl', 'Music', 34.90, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pamper Diagpers', 'Baby', 49.98, 584);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('YETI Roadie', 'Outdoors', 199.99, 73);