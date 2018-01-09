'use strict';

angular.module('wrapsy')
  .controller('InvoiceCtrl', ['$scope', 'Order', '$stateParams', function($scope, Order, $stateParams) {
    $scope.invoice = Order.get({ id: $stateParams.id });
  }]);
