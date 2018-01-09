'use strict';
/*
(function() {

  class HomeController {


    constructor($http, $scope, $timeout, Catalog, Product,$mdDialog,Auth, $state, Registry, toaster, Home) {
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.slides = [];*/
/*
      Product.query(function(res){
        $scope.products = res;
        console.log($scope.products);
      });*/

    /*  $scope.homepageimgs = Home.gethompageImg(function(res){
        $scope.slides =   res;
      })
      */
      /*for(var i=1;i<5;i++){  
        $scope.slides.push({
          image: 'assets/uploads/kpZU2hhRMD9WMyuXgf7ZY5WI.jpeg',
          text : "The Perfect Gift to Complete your Perfect Celebration"
        });
      }
      */
    /*  $scope.createRegistry = function(ev){
        if($scope.isLoggedIn()){
          $state.go('registryType');
        }else{
          $scope.data = {'state' : 'registryType' , 'event' : 'login'};
          $scope.login(ev, $scope.data);
        }
      }*/

/*      $scope.login = function(ev,data) {
        console.log("inside login")
        $mdDialog.show({
          controller: 'LoginController'
          , templateUrl: 'app/account/login/login.html'
          , parent: angular.element(document.body)
          , targetEvent: ev
          
          , clickOutsideToClose: true
          , locals: {
            dataToPass: data
          }
        });

        $scope.$watch(function () {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      }



      $scope.myregistries = function(){

        var q = {count:{username:Auth.getCurrentUser().name}};
        q._id = 1;

        Registry.query(q,function(data) {
          console.log(data)
          if(data.length == 1){
            $state.go('manageregistry', {id: data[0]._id});
          }else{
            $scope.openregistryList(data);
          }

        });
      }
      */

      /*$scope.registryslides = [
      { image: 'assets/img/sampleWedding.jpg', registry: '59177dd6fb639b354f5e9d63' , text : "Wedding Registry" },
      { image: 'assets/img/sampleBaby.jpg', registry: '59177e86fb639b354f5e9d65' , text : "Baby Registry" },
      { image: 'assets/img/sampleWishlist.jpg', registry: '59177eebfb639b354f5e9d67', text : "House Warming Registry" },
      { image: 'assets/img/samplebirthday.jpg', registry: '59177e86fb639b354f5e9d65', text : "Birthday Registry" }
      
      ];*/

   /*   var q = {where:{featured:true}};
      $scope.products = Product.query(q,function(products){

        $scope.products = products;
        console.log($scope.products);
      });*/
      


/*    }
  }

  angular.module('wrapsy')
  .controller('HomeController', HomeController);

})();*/


'use strict';

angular.module('wrapsy')
.controller('HomeController', ['$scope', '$state',  '$stateParams','$mdDialog','Auth','Registry','Home',
  function($scope, $state, $stateParams ,$mdDialog,Auth, Registry,Home) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.slides = [];

    $scope.homepageimgs = Home.gethompageImg(function(res){
      $scope.slides =   res;
      console.log($scope.slides)
    })

    $scope.createRegistry = function(ev){
      console.log("inside create registry function")
      if($scope.isLoggedIn()){
        $state.go('registryType');
      }else{
        $scope.data = {'state' : 'registryType' , 'event' : 'login'};
        $scope.login(ev, $scope.data);
      }
    }

    $scope.create = function(ev){
      console.log("inside create registry function")
      if($scope.isLoggedIn()){
        $state.go('registryType');
      }else{
        $scope.data = {'state' : 'registryType' , 'event' : 'login'};
        $scope.login(ev, $scope.data);
      }
    }


    $scope.myregistries = function(){

      var q = {count:{username:Auth.getCurrentUser().name}};
      q._id = 1;

      Registry.query(q,function(data) {
        console.log(data)
        if(data.length == 1){
          $state.go('manageregistry', {id: data[0]._id});
        }else{
          $scope.openregistryList(data);
        }

      });
    }

    $scope.login = function(ev,data) {
      console.log("inside login")
      $mdDialog.show({
        controller: 'LoginController'
        , templateUrl: 'app/account/login/login.html'
        , parent: angular.element(document.body)
        , targetEvent: ev

        , clickOutsideToClose: true
        , locals: {
          dataToPass: data
        }
      });

      $scope.$watch(function () {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    }
  }
  ])

