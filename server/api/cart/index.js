'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//router.get('/:id/mycart', controller.mycart);
router.post('/', controller.create);
router.post('/:id/addTocart', controller.addToCart)
//router.put('/:id', controller.update);
router.put('/:id/alterpdtQuantity', controller.alterpdtQuantity)
//router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;
