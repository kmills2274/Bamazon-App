DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  product_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY(product_id),
  KEY department_id (department_id)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Colgate Total Toothpaste", "Personal Care", 3.99, 300),
  ("Venom Blu-Ray Combo Pack", "Movies", 29.99, 100),
  ("Ray-Ban Aviator Sunglasses", "Accessories", 200.00, 55),
  ("Stainless Steel Tumbler", "Kitchen", 15.00, 23),
  ("Converse High-Top Sneakers", "Women's Shoes", 49.99, 32),
  ("Shower Curtain", "Bath", 19.99, 75),
  ("Call of Duty for X-Box", "Video Games", 59.99, 75),
  ("Red T-Shirt", "Men's Apparel", 25.50, 21),
  ("Desk Organizer", "Office", 30.00, 17),
  ("Protein Bars", "Food", 15.95, 250);
