var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Daffy1988",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    connection.query("select * from products", function (err, res) {
        console.table(res)
        Start(res);
    })

});

function Start(res) {

    inquirer.prompt([
        {
            type: 'input',
            name: "itemId",
            message: "What is the id of the item you would like to purchase?"
        },
        {
            type: 'input',
            name: 'units',
            message: 'How many units would you like to buy?'
        },
    ])
        .then(function (answer) {
            console.log(answer);
            console.log(res[answer.itemId - 1])
            if (parseInt(answer.units) > res[answer.itemId - 1].stock_quantity) { console.log("insufficient quantity") }
            else {
                var total = parseInt(answer.units) * res[answer.itemId - 1].price
                console.log("Your total is $" + total)
                inquirer.prompt([
                    {
                        type: 'confirm',
                        name: "continue",
                        message: "Continue with purchase?"
                    }])
                    .then(function (ans) {
                        if (!ans.continue) return connection.end()
                        var newQuantity = (res[answer.itemId - 1].stock_quantity-parseInt(answer.units))
                        connection.query()
    
                    })
            }

        })
};

//        ).then(function(response) {
//            console.log(response);
//        })
