'use strict';

/* Controllers */
var baseUrl = "http://localhost:8081/";

function IndexCtrl($scope, $http) {
  $http.get(baseUrl + 'posts').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    });
}

function UserCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.addUser = function () {
    $http.post(baseUrl + 'user', $scope.form).
      success(function(data) {
        $location.path('/shops/' + data._id);//data.id);
      });
  };
}

function MarketPlaceCtrl($scope, $http, $location) {
  $scope.form = {};
  $http.get(baseUrl + '/shops').
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
  $scope.user_id = 1;//$routeParams.id;
  $http.get(baseUrl + 'shops/' + $routeParams.id).
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
