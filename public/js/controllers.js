'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function UserCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.addUser = function () {
    $http.post('/api/user', $scope.form).
      success(function(data) {
        $location.path('/shops/' + 1);//data.id);
      });
  };
}

function MarketPlaceCtrl($scope, $http, $location) {
  $scope.form = {};
  $http.get('/api/shops').
    success(function(data) {
      $scope.shops = data.posts;
    });

  $scope.getShop = function () {
    $location.url('/marketPlace/' + $routeParams.id);
  };
}

function ShopCtrl($scope, $http, $routeParams) {
  $http.get('/api/shops/' + $routeParams.id).
    success(function(data) {
      $scope.shop = data.post;
    });
}

function UserShopsCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $scope.user_id = 1;//$routeParams.id;
  $http.get('/api/shops/' + $routeParams.id).
  success(function(data) {
    $scope.shops = data;
  });

  $scope.getShop = function () {
    $location.url('/shops/' + $routeParams.id);
  };

  $scope.home = function () {
    $location.url('/');
  };
}
