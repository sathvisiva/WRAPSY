'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var autoIncrement = require('mongoose-auto-increment');
import config from '../../config/environment';
var Schema = mongoose.Schema

autoIncrement.initialize(mongoose.createConnection(config.mongo.uri));

var OrderItemSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  total: Number,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  statuschange : [{
      status : String,
      modified : {
            type: Boolean,
            default: false
      }
  }]
});

var OrderSchema = new Schema({
  orderNumber: String,
  shipping: Number,
  tax: Number,
  taxRate: Number,
  subTotal: Number,
  totalCost: Number,
  items: [OrderItemSchema],
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shipping : {
  customerName: String,
  customerEmail: String,
  customerAddress: String,
  customerPhone: String,
  customerCity: String,
  customerState: String,
  customerCountry: String
  },
  payment : {
      method : String,
      txn : String
  },
  voucher: {
    type: Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  delivered: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber',
  startAt: 400000,
  incrementBy: 1
});

export default mongoose.model('Order', OrderSchema);
