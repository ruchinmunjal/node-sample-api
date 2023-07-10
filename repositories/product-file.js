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

repo.getById = function (id, resolve, reject) {
  fs.readFile(DATA_FILE, function (err, data) {
    if (err) {
      reject(err);
    } else {
      let products = JSON.parse(data);
      let product = products.find((row) => row.productID == id);
      resolve(product);
    }
  });
};

repo.search = function (search, resolve, reject) {
  if (search) {
    fs.readFile(DATA_FILE, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let products = JSON.parse(data);
        products = products.filter(
          (row) =>
            (search.name
              ? row.name.toLowerCase().indexOf(search.name.toLowerCase()) >= 0
              : true) &&
            (search.listPrice
              ? parseFloat(row.listPrice) > parseFloat(search.listPrice)
              : true)
        );
        resolve(products);
      }
    });
  }
};

repo.insert = function(newProduct,resolve,reject){
    fs.readFile(DATA_FILE,function(err,data){
        if (err) {
            reject(err)
        } else {
            let products= JSON.parse(data);
            products.push(newProduct);
            fs.writeFile(DATA_FILE,JSON.stringify(products),function(err){
                if (err) {
                    reject(err)
                } else {
                    resolve(newProduct);
                }
            });
        }
    });
};
module.exports = repo;
