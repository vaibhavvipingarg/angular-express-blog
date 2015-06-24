'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addShop', {
        redirectTo: '/signup'
      }).
      when('/addShop/:id', {
        templateUrl: 'partials/addShop',
        controller: AddShopCtrl
      }).
      when('/login', {
        templateUrl: 'partials/login',
        controller: UserCtrl
      }).
      when('/logout', {
        templateUrl: 'partials/index',
        controller: LogoutCtrl
      }).
      when('/signup', {
        templateUrl: 'partials/signup',
        controller: UserCtrl
      }).
      when('/marketPlace', {
        templateUrl: 'partials/marketPlace',
        controller: MarketPlaceCtrl
      }).
      when('/marketPlace/:id', {
        templateUrl: 'partials/shop',
        controller: ShopCtrl
      }).
      when('/marketPlace/products/:product_id', {
        templateUrl: 'partials/product',
        controller: ProductCtrl
      }).
      when('/shops/:id', {
        templateUrl: 'partials/userShops',
        controller: UserShopsCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);