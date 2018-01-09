'use strict';

angular.module('wrapsy')
.controller('ManageProductsCtrl', ['$scope', 'Product', 'Modal',
  function($scope, Product, Modal) {

    $scope.displayProducts = function(){
      Product.query(function(products) {
        $scope.products = products;
        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.products.length;
        $scope.itemsPerPage = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      });

    }
    $scope.displayProducts();

    $scope.deleteProduct = Modal.confirm.delete(function(p) {
      if (p.slug == 'all') return;
      p.$remove(p._id, function(resp) {
        console.log(resp)
        $scope.products.splice($scope.products.indexOf(p), 1);
      })
    });

    $scope.featuredProducts = function(featured , id,p){
      if(featured){
        Product.addfeaturedPdt({id:id},p).$promise.then(function(products) {
         $scope.displayProducts();
       });
      }else{
        Product.removefeaturedPdt({id:id},p).$promise.then(function(products) {
          $scope.displayProducts();
        });
      }
    }
  }
  ])
.controller('ManageProductsEditCtrl', ['$scope', '$stateParams', '$state', 'Upload', 'categories', 'product', 'Product',
  function($scope, $stateParams, $state, Upload, categories, product, Product) {

    $scope.categories = categories;
    $scope.product = product;
      // upload on file select or drop
      $scope.upload = function(file) {
        if ($scope.imageUrl.$valid && file) {
          Upload.upload({
            url: '/api/uploads',
            data: { file: file }
          }).then(function(resp) {
            if ($scope.product) {
              $scope.product.imageUrl = resp.data.url;
            } else {
              $scope.product = { imageUrl: resp.data.imageUrl }
            }
            console.log(resp.data);
          }, function(resp) {
            $scope.errorMsg = resp.status + ': ' + resp.data;
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };
      }

      $scope.save = function(form) {
        if (form.$valid) {
          Product.update($scope.product._id, $scope.product, function(resp) {
            console.log(resp);
            $state.go('manage-products');
          }, function(err) {
            console.log(err)
          })
        }
      }
    }
    ])
.controller('ManageProductsAddCtrl', ['$scope', '$state', 'Product', 'categories', 'Upload','Feature','$filter','$window','Vendor',
  function($scope, $state, Product, categories, Upload, Feature,$filter, $window, Vendor) {
    $scope.categories = categories;

      // upload on file select or drop
      $scope.upload = function(file) {
        if (file) {
          Upload.upload({
            url: '/api/uploads',
            data: { file: file }
          }).then(function(resp) {

            if ($scope.product) {
              if($scope.product.images)
                $scope.product.images.push(resp.data.url);
              else{
                $scope.product.images = [];
                $scope.product.images.push(resp.data.url);
              }
            } else {
              $scope.product = {} ; $scope.product.images = [];
              $scope.product.images.push(resp.data.url);
            }
          }, function(resp) {
            $scope.errorMsg = resp.status + ': ' + resp.data;
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
        };
      }

      /*var loading_screen = $window.pleaseWait({
        logo: "assets/img/logo/giftcard.jpg",
        backgroundColor: 'transparent',
        loadingHtml: '<div class="sk-spinner sk-spinner-wandering-cubes"><div class="sk-cube1"></div><div class="sk-cube2"></div></div>'
      });*/

      /*$scope.asin = "B00KGZZ824"
      $scope.product = {}
      $scope.product.asin = "B00KGZZ824"
      Product.amazonaffiliate($scope.product,function(data){

      })*/
      $scope.product = {}
      $scope.product.features = []
      var datas = []
      Feature.group(function(data) {     
        $scope.filterfeatures = data
        datas = data
        console.log($scope.filterfeatures)

      });

      $scope.SelectedRow = function(key){
        $scope.options = $filter('filter')($scope.filterfeatures, {key: key })[0].v;
        console.log($scope.options)

      }

      $scope.deleteFeature = function(index){
        $scope.product.features.splice(index,1)
      }

      $scope.addfeature = function(feature){
        $scope.product.features.push(feature)
        $scope.feature = '';
        console.log($scope.product.features)
      }

      Vendor.query(function(data){
        $scope.vendors = data;
      })


      $scope.save = function() {
        if (true) {
          Product.save($scope.product, function(resp) {
            console.log(resp);
            $state.go('admin.products');
          }, function(err) {
            console.log(err)
          })
        }
      }
    }
    ]);
