/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Order = require('./order.model');
var Voucher = require('../voucher/voucher.model');
var Product = require('../product/product.model').product;
var Registry = require('../registry/registry.model').registry;


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Orders
export function index(req, res) {
  Order.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a list of user Orders
export function myOrders(req, res) {
  Order.findAsync({ customerId: req.params.id })
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  Order.createAsync(req.body)
    .then(entity => {
      if (entity) {
        _.each(entity.items, function(i) {
          Product.findByIdAsync(i.productId)
            .then(function(product) {
              product.stock -= i.quantity;
              product.saveAsync();
            });
        })
        if(entity.voucher != null){
          Voucher.update({ 'code' : entity.voucher }, { $set: { redeemed: true }}, function (err, resp) {
          if (err) {
            resp.err = err;
            resp.data = null;
            resp.code = 422;

            return res.json(responseObject);
          }
        });
        }
        res.status(201).json(entity);
      }
    })
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
