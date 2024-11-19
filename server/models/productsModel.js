const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  ticker: {
    type: String,
    required: true,
  },
  data: [{
    date: {
      type: Date,
      required: true
    },
    adjClose: {
      type: Number,
      required: true
    }
  }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
