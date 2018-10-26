const Product = require('../api/product/model');

const productObjects = [
  { 
    product_name: 'A',
    weight: 2
  },
  { 
    product_name: 'B',
    weight: 2
  }
];

if (process.env.NODE_ENV === 'development' || 
    process.env.NODE_ENV  === 'testing') {
  Product.count({}, (err, count) => {
    if (count < 1) {
      productObjects.forEach((r) => {
        const newProduct = new Product({
          product_name: r.product_name,
          weight: r.weight
        });
        newProduct.save();
      });
      console.log('Product Seed Done');
    }
  });
}
