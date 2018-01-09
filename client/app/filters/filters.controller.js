'use strict';

angular.module('wrapsy')
.controller('FiltersCtrl', ['$scope', 'Filter', 'Modal' ,'$filter','Feature',
  function($scope, Filter, Modal,$filter,Feature) {

    $scope.SelectedRow = function(key){
      $scope.options = $filter('filter')($scope.filterfeatures, {key: key })[0].v;
      console.log($scope.options)

    }

    $scope.query = function(){
      Filter.query(function(data) {
        $scope.filters = data;
        $scope.currentPage = 1;
        $scope.totalItems = $scope.data.length;
        $scope.itemsPerPage = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      });
    }

    $scope.query()

    $scope.save = function(form) {
      if (form.$valid) {
        console.log($scope.filter)

        Filter.save($scope.filter, function(resp) {
          $scope.filter = ''
          $scope.query()
        }, function(err) {
          console.log(err);
          $scope.message == err;
        });
      }
    }



    var datas = []
    Feature.group(function(data) {     
      $scope.filterfeatures = data
      datas = data
      console.log($scope.filterfeatures)

    });
/*

    Vendor.query(function(vendor) {
      $scope.vendor = vendor;
      console.log(vendor)
        
        $scope.currentPage = 1;
        $scope.totalItems = $scope.vendor.length;
        $scope.itemsPerPage = 2; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      });

    $scope.propertyName = 'name';
    $scope.reverse = true;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    $scope.deleteVendor = Modal.confirm.delete(function(c) {

      c.$remove(c._id, function(resp) {
        console.log(resp)
        $scope.vendor.splice($scope.vendor.indexOf(c), 1);
      })
    });*/
  }
  ])

.controller('ManageFilterCtrl', ['$scope', '$state', 'Vendor', '$stateParams',
  function($scope, $state, Vendor, $stateParams) {


    $scope.vendor = Vendor.get({ id: $stateParams.id },function(data){
      console.log(data)
    });

    $scope.save = function(form) {
      if (form.$valid) {
        Vendor.update({ id: $scope.vendor._id }, $scope.vendor, function(resp) {
          console.log('updated', resp);
          $state.go('admin.vendors');
        }, function(err) {
          console.log(err);
        });
      }
    }
  }
  ])

.controller('VendorsAddCtrl', ['$scope', '$state', 'Vendor', '$stateParams',
  function($scope, $state, Vendor, $stateParams) {



    $scope.save = function(form) {
      if (form.$valid) {
        console.log($scope.vendor)
        Vendor.save($scope.vendor, function(resp) {
          $state.go('admin.vendors');
        }, function(err) {
          console.log(err);
          $scope.message == err;
        });
      }
    }
  }
  ]);
