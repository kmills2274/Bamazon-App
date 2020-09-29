var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

// MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect();

// Manages connection query to MySQL and uses cli-table2 package to display data table
var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Console welcome message
    console.log("-------------------------------------------------------------");
    console.log("      Welcome To Bamazon! Thank you for shopping with us!    ");
    console.log("-------------------------------------------------------------");
    console.log("");
    console.log("See our list of products below.");
    console.log("");

    // Connect to cli-table
    var table = new Table({
      head: ["Product ID", "Product Name", "Price"],
      colWidths: [12, 50, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["yellow"],
        compact: true
      }
    });

    // Looping through length of results and push product ID, name & price 
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].product_id, res[i].product_name, res[i].price]);
    }

    console.log(table.toString());
    console.log("");
    shopping();
  });
};

// Uses inquirer to prompt the user through a series of questions to select product and quantity
var shopping = function() {
  inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Please enter the Product ID of the item you wish to purchase."
    })

    // Answers query with proper prompt
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      connection.query("SELECT * FROM products WHERE product_id=?", selection, function(
        err,
        res
      ) {
        
        // "if" user selects product that is not on the list
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "That item doesn't exist. Please enter a Product ID from the list above."
          );

          shopping();

          // Quantity input
        } else {
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "What quantity would you like to purchase?"
            })
            .then(function(answer2) {
              var quantity = answer2.quantity;

              // Handles quantity message if there is not enough in the database
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "We are sorry, currently we only have " +
                    res[0].stock_quantity +
                    " total quantity of the product selected."
                );
                shopping();

                // Logs items purchased & thier prices in the console
              } else {
                console.log("");
                console.log(res[0].product_name + " purchased");
                console.log(quantity + " qty @ $" + res[0].price);

                // Updates quantity in the database
                var newQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity = " +
                    newQuantity +
                    " WHERE product_id = " +
                    res[0].product_id,
                  function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Success! Your Order has been Received.");
                    console.log("Thank you for your purchase!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();
