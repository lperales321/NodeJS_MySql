DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT,
    stock_quantity INTEGER,
    product_sales FLOAT default 0.00
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Sunglasses', 'Accessories', 50.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Sweatshirt', 'Clothing', 45.00, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Laptop', 'Computers', 600.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pressure Cooker', 'Kitchen', 65.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Dog Food', 'Pets', 30.90, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Dyson Hair Dryer', 'Beauty', 399.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cricut', 'Arts and Crafts', 369.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pink Floyd Vinyl', 'Music', 34.90, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pamper Diapers', 'Baby', 49.98, 584);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('YETI Roadie', 'Outdoors', 199.99, 73);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Crib', 'Baby', 225.65, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Patio Table', 'Outdoors', 384.51, 25);


CREATE TABLE departments
(
    department_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs FLOAT
);

INSERT INTO departments (department_name, over_head_costs) VALUES ('Accessories', 552.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Clothing', 489.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Computers', 6584.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Kitchen', 627.99);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Pets', 367.90);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Beauty', 3315.99);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Arts and Crafts', 3945.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Music', 331.90);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Baby', 475.98);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Outdoors', 1245.99);