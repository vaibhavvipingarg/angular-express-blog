'use strict';

/* Controllers */
var baseUrl = "http://localhost:8081/";

function IndexCtrl($scope, $http) {
  $http.get(baseUrl + 'shops').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    });
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

  $scope.getShop = function () {
    $location.url('/marketPlace/' + $routeParams.id);
  };
}

function ShopCtrl($scope, $http, $routeParams) {
  $http.get(baseUrl + 'shops/' + $routeParams.id).
    success(function(data) {
      $scope.shop = data.post;
    });
}

function UserShopsCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get(baseUrl + 'user/shops/' + $routeParams.id).
  success(function(data) {
    $scope.shops = data;
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
