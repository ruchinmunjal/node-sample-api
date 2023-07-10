const express = require("express");

const app = express();
const router = express.Router();
app.use(express.json());
const port = 3000;

router.use('/product', require('./routes/product'));

app.use("/api", router);
//Create web server to listen on specific port
let server = app.listen(port, function () {
  console.log(`API server is running on http://localhost:${port}`);
});
