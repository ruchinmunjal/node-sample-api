const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res, next) => {
    let products = [{
        "productId":89,
        "name":"All purpose bike stand"
    },
    {
        "productId":90,
        "name":"Bike wash disolver"
    },
    {
        "productId":91,
        "name":"Cable Lock"
    },
    {
        "productId":92,
        "name":"Chain"
    }
];
//res.status(206).json(products);
    //res.send(products);
    res.json({
        "status":200,
        "statusText":"OK",
        "message":"All products retrieved",
        "data":products
    });
});


//Create web server to listen on specific port
let server = app.listen(port, function () {
  console.log(`API server is running on http://localhost:${port}`);
});
