const fs = require("fs");

const DATA_FILE = "./db/product.json";

let repo = (exports = module.exports = {});

repo.get = function (resolve, reject) {
  fs.readFile(DATA_FILE, function (err, data) {
    if (err) {
      reject(err);
    } else {
      let products = JSON.parse(data);
      resolve(products);
    }
  });
};

repo.getById=function(id,resolve,reject){
fs.readFile(DATA_FILE,function(err,data){
    if(err){
        reject(err);
    }
    else{
        let products=JSON.parse(data);
        let product=products.find(row=>row.productID == id);
        resolve(product)
    }
})
};
module.exports = repo;
