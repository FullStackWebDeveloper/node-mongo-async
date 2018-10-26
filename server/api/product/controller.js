const Product = require('./model');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');

module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts
}

function getProducts(req, res) {
  try {
    Product.find().sort('created_at').exec((err, products) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(products);
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

function addProducts(req, res) {
  try {
    const products = req.body;
    asyncCall(res, products);
  } catch (err) {
    res.status(500).send(err);
  }
}

function resolveAddProduct(newProduct) {
  return new Promise(resolve => {
    Product.findOne({
      weight: newProduct.weight
    }).exec((err, product) => {
      if (!product) {
        const saveProduct = new Product(newProduct);
        saveProduct.product_id = cuid();
        saveProduct.product_name = sanitizeHtml(newProduct.product_name);
        saveProduct.weight = sanitizeHtml(saveProduct.weight);
        saveProduct.save(function (err, saved) {
          if (err) {
            res.status(500).send(err);
          } else {
            resolve(saved);
          }
        });
      } else {
        resolve(null)
      }
    })
  });
}

async function asyncCall(res, products) {
  let results = [];
  for (let i = 0; i < products.length; i++) {
    // Let's sanitize inputs
    var result = await resolveAddProduct(products[i]);
    if (result) {
      results.push(result);
    }
  }
  return res.json(results);
}


function updateProducts(req, res) {
  try {
    const products = req.body;
    Product.remove({}).exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      }
      asyncCall(res, products);
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

function deleteProducts(req, res) {
  try {
    const products = req.body;
    products.forEach((product, index) => {
      Product.remove({
        product_name: product.product_name,
        weight: product.weight
      }).exec((err, product) => {
        if (err) {
          res.status(500).send(err);
        }
        if (index == products.length - 1) {
          res.status(200).end();
        }
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
}