const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  weight: { type: Number,  required: true },
  created_at: { type: 'Date', default: Date.now, required: true }
});

module.exports = mongoose.model('Product', productSchema);
