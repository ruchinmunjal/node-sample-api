const express = require("express");

const app = express();

const port = 3000;
const repo = require("./repositories/product-file");

app.get("/", (req, res, next) => {
  repo.get(
    function (data) {
      res.json({
        status: 200,
        statusText: "OK",
        message: "All products retrieved",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );

  //let products = repo.get();
  //res.status(206).json(products);
  //res.send(products);
});

app.get('/:id', (req, res, next) => {
  repo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.send({
          status: 200,
          statusText: "OK",
          message: "Single product received",
          data: data,
        });
      } else {
        let msg = `The product '${req.params.id}' could not be found`;
        res.status(404).send({
          status: 404,
          statusText: "OK",
          message: msg,
          error: {
            code: "NOT_FOUND",
            message: msg,
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

//Create web server to listen on specific port
let server = app.listen(port, function () {
  console.log(`API server is running on http://localhost:${port}`);
});
