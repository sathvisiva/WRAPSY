'use strict';

angular.module('wrapsy')
.factory('Order', function($resource) {
  return $resource('/api/orders/:id/:controller', {
    id: '@_id'
  }, {
    'update': { method: 'PUT' },
    'myOrders': {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'myorders'
      }
    },
    'updateStatus': {
      method: 'PUT',
      params: {
        controller: 'updateStatus'
      }
    }
  });
});
