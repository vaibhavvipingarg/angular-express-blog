'use strict';

/* Controllers */
var baseUrl = "http://localhost:8081/";

function LogoutCtrl($scope, $http, $location) {
  $http.get(baseUrl + 'logout').success(function(err){
    console.log(err);
    //Redirect to the homepage
    $location.path('/');
  });
}

function IndexCtrl($scope, $http) {
  $http.get(baseUrl + 'shops').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    });

    $scope.logout = function() {
      $http.post(baseUrl + 'logout').
        success(function(err){
          console.log(err);
          //Redirect to the homepage
          $location.path('/');
        });
    };
}

function UserCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.addUser = function () {
    $http.post(baseUrl + 'user', $scope.form).
      success(function(data) {
        $location.path('shops/' + data._id);//data.id);
      });
  };

  $scope.getUser = function () {
    $http({
      url: baseUrl + 'user',
      method: 'GET',
      params: {
        email: $scope.form.email,
        password: $scope.form.password
      }}).success(function(data) {
        $location.path('shops/' + data._id);//data.id);
      });
    };
  }

function MarketPlaceCtrl($scope, $http, $location) {
  $scope.form = {};
  $http.get(baseUrl + 'shops').
    success(function(data) {
      $scope.shops = data;
    });

  $scope.getShop = function (shid) {
    $location.url('/marketPlace/' + shid);
  };
}

function ShopCtrl($scope, $http, $routeParams) {
    $http.get(baseUrl + 'shops/' + $routeParams.id).
      success(function(data) {
        $scope.shop = data;
      });

  $scope.addProduct = function () {
    $scope.form.shop_id = $routeParams.id;
    $http.post(baseUrl + 'shops/' + $scope.form.shop_id + '/products' , $scope.form).
      success(function(data) {
          // Load the shop data
    $http.get(baseUrl + 'shops/' + $routeParams.id).
      success(function(data) {
        $scope.shop = data;
      });
    });
  };

  $scope.addReview = function () {
    $scope.form.shop_id = $routeParams.id;
    $http.post(baseUrl + 'shops/' + $scope.form.shop_id + '/review' , $scope.form).
      success(function(data) {
          // Load the shop data
    $http.get(baseUrl + 'shops/' + $routeParams.id).
      success(function(data) {
        $scope.shop = data;
      });
    });
  };
}

function UserShopsCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get(baseUrl + 'shops/user/' + $routeParams.id).
  success(function(res) {
    if (res.status == 403) {
      //Redirect to the homepage
      $location.url('/');
    } if (res.status == 200) {
      $scope.shops = res.data;      
    }
  });

  $scope.addShop = function () {
    $scope.form.owner_id = $routeParams.id;
    $http.post(baseUrl + 'shops', $scope.form).
      success(function(data) {
       $http.get(baseUrl + 'shops/user/' + data.owner_id).
        success(function(data) {
          $scope.shops = data;
        });
    });
  };

  $scope.getShop = function () {
    $location.url('/shops/' + $routeParams.id);
  };

  $scope.home = function () {
    $location.url('/');
  };
}
