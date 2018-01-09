'use strict';

angular.module('wrapsy')
.controller('CategoryCtrl', ['$scope', '$stateParams', 'Product','$rootScope','$state', 'Catalog',function($scope, $stateParams, Product, $rootScope, $state, Catalog) {

  $scope.categoryTitle = $stateParams.slug;  
  $scope.page = 1;

  $scope.list = 5;

  $scope.priceSlider = {};


  $scope.slider = {
    minValue: 0,
    maxValue: 10000,
    options: {
      floor: 0,
      ceil: 10000,
      step: 1,
      onEnd: function() {
        $scope.filter();

      }
    }
  };


  $scope.selected = {
    sizes: {},
    colors : {}
  };

//    selected.sizes






$scope.displayProducts = function(q){
 
  $scope.products = Product.query(q, function(res){
    console.log(res);
  });
 
  Product.productCount(q, function(res){
    $scope.totalItems = res[0].count;
    console.log("items" + $scope.totalItems)
    $scope.totalPages = Math.ceil($scope.totalItems/$scope.list);
    console.log("pages" + $scope.totalPages);
    if($scope.totalPages == $scope.page){
      $scope.disablednext = true;
    }
    if($scope.totalPages != $scope.page){
      console.log("inside second if");
      $scope.disablednext = false;
    }
  });  

}




$scope.category = Catalog.get({ id: $stateParams.slug }, function(category){
  console.log(category)
  $scope.selectedcategories = [category._id].concat(category.children);
  var r = {where:{parent:category._id}};
  $scope.childcategories = Catalog.query(r)

  $scope.filter(true,$scope.page);
});





$scope.nextPage = function(){
  if($scope.page < $scope.totalPages){
    $scope.page = $scope.page + 1;
    $scope.filter(false,$scope.page);
        /*  var q = {};
          var f = [];
          f.push({'categories' : { $in: $scope.selectedcategories  } }); 
          q.where = { $and : f};
          q.sort = 'asc';
          q.skip = ($scope.page - 1 )*$scope.list;
          console.log("skip" + q.skip);
          q.list = $scope.list;
          $scope.displayProducts(q);*/
        }

        if($scope.totalPages == $scope.page){
          $scope.disablednext = true;
        }
        if($scope.totalPages != $scope.page){
          console.log("inside second if");
          $scope.disablednext = false;
        }


      }

      $scope.previousPage = function(){

        if($scope.page > 1){
          $scope.page = $scope.page - 1;
          $scope.filter(false,$scope.page);
        }
        if($scope.totalPages == $scope.page){
          $scope.disablednext = true;
        }
        if($scope.totalPages != $scope.page){
          console.log("inside second if");
          $scope.disablednext = false;
        }


   /* $scope.page = $scope.page - 1;

   $stateParams.slug == 'all' ? Product.query(process($scope)) : Product.catalog({ id: $stateParams.slug, limit: 4, page : $scope.page  },q);*/
 }

 $scope.fl = {};

 $scope.filter = function(){
  $scope.filter(false,$scope.page)
}

$scope.filter = function(flush,page){

  var q = {};
  var f = [];
  f.push({'categories' : { $in: $scope.selectedcategories  } }); 
  if($scope.fl.features){
    var f = [];
    angular.forEach($scope.fl.features,function(val, key){
      if(val.length>0){
        f.push({'features.key' : key, 'features.val' : { $in: val}});
      }
    });    
  }
  f.push({'price' : { $gt: $scope.slider.minValue, $lt:$scope.slider.maxValue } });
  q.where = { $and : f};
  q.sort = 'asc';
  q.skip = ($scope.page - 1 )*$scope.list;
  q.list = $scope.list;

  /*console.log($scope.selected.sizes);*/


  $scope.displayProducts(q);

}
}]);

