const router = require("express").Router();

const repo = require("../repositories/product-file");

router.get("/", (req, res, next) => {
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

router.get("/search", (req, res, next) => {
  let search = {
    name: req.query.name,
    listPrice: req.query.listPrice,
  };

  if (search.name || search.listPrice) {
    repo.search(
      search,
      function (data) {
        if (data && data.length > 0) {
          res.send({
            status: 200,
            statusText: "OK",
            message: "Search was successful",
            data: data,
          });
        } else {
          let msg = `The search for '${JSON.stringify(
            search
          )}' was not successful`;
          res.status(400).send({
            status: 400,
            statusText: "Not Found",
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
  } else {
    let msg = `No search parameters passed in`;
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: msg,
      error: {
        code: "BAD_REQUEST",
        message: msg,
      },
    });
  }
});

router.get("/:id", (req, res, next) => {
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

router.post("/", function (req, res, next) {
  repo.insert(
    req.body,
    function (data) {
      res.status(201).send({
        status: 201,
        statusText: "Created",
        message: "New product added",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

module.exports = router;
