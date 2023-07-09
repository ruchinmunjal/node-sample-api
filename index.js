const express = require("express");

const app = express();

const port = 3000;
const repo = require("./repositories/product-file");

app.get("/", (req, res, next) => {
  let products = repo.get();
  //res.status(206).json(products);
  //res.send(products);
  res.json({
    status: 200,
    statusText: "OK",
    message: "All products retrieved",
    data: products,
  });
});

//Create web server to listen on specific port
let server = app.listen(port, function () {
  console.log(`API server is running on http://localhost:${port}`);
});
