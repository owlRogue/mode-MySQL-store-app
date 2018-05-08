### Schema

-- CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name varchar(255) NOT NULL,
	department_name varchar(255) DEFAULT false NOT NULL,
	price DECIMAL (6,2) NOT NULL,
	stock_quantity INTEGER NOT NULL,
	sold_units INTEGER NOT NULL,
	PRIMARY KEY (item_id)
);


-- CREATE TABLE products_sold
-- (
-- 	sale_id int NOT NULL AUTO_INCREMENT,
-- 	item_id int NOT NULL,
-- 	product_name varchar(255) NOT NULL,
-- 	department_name varchar(255) DEFAULT false NOT NULL,
-- 	price DECIMAL (6,2) NOT NULL,
-- 	stock_quantity INTEGER NOT NULL,
-- 	sold_units INTEGER NOT NULL,
-- 	PRIMARY KEY (sale_id)
-- );
--  mysql --host=127.0.0.1 --port=3306 --user=root --password=root