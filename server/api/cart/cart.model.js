'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import config from '../../config/environment';
var Product = require('../product/product.model').product;
var Schema = mongoose.Schema

var CartSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ip : String,
  quantity: Number,  
  registry :  {
    type: Schema.Types.ObjectId,
    ref: 'Registry'
  },
  features : Array,
  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },    
  last_modified: {
    type: Date,
    default: Date.now
  }
});



export default mongoose.model('Cart', CartSchema);
