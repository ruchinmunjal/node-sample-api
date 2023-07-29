require('stackify-node-apm');
const express = require("express");
const swaggerUi=require("swagger-ui-express");
const openApiDocumentation = require("../sample-api/openapi.json");


const app = express();
const router = express.Router();
app.use(express.json());
const port = 3000;

router.use('/product', require('./routes/product'));

app.use("/api", router);
app.use("/docs",swaggerUi.serve, swaggerUi.setup(openApiDocumentation))
//Create web server to listen on specific port
let server = app.listen(port, function () {
  console.log(`API server is running on http://localhost:${port}`);
});
