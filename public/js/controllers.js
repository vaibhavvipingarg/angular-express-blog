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

function IndexCtrl($scope, $http, $location) {
  $scope.results = [];
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

    $scope.submitSearch = function() {
      $http.get(baseUrl + 'products/search' + '?q=' + $scope.query).
        success(function(res) {
          if (res.status === 200) {
            $scope.results = res.data;  
        }
      });
    };

    $scope.getProduct = function (product_id) {
      $location.url('/marketPlace/products/' + product_id);
    };
}

function AddShopCtrl($scope, $http, $routeParams, $location) {
  if ($routeParams.id === undefined) {
    $location.path('signup');
  }
  //check if the user is logged in, if not then redirect to login page-  add code there to bring the user to addshop page after login/signup complete
  $scope.getUser = function () {
    $http({
        url: baseUrl + 'profile',
        method: 'GET'
      }).success(function(res) {
        if (res.status === 200) {
          //If the user exists
          if (res.data) {

          }
        } else if (res.status === 403) {
          $location.path('login');
        }
      });
    };
}

function ProductCtrl($scope, $http, $routeParams) {
    $scope.product = {};
    $http.get(baseUrl + 'products/' + $routeParams.product_id).
      success(function(res) {
        if (res.status === 200) {
          $scope.product = res.data;  
      }
    });
}

function UserCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.addUser = function () {
    $http.post(baseUrl + 'user', $scope.form).
      success(function(data) {
        $location.path('addShop/' + data._id);
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
        $location.path('shops/' + data._id);
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

function ShopCtrl($scope, $http, $routeParams, $location) {
    $http.get(baseUrl + 'shops/' + $routeParams.id).
      success(function(data) {
        $scope.shop = data;
      });

  $scope.getProduct = function (product_id) {
    $location.url('/marketPlace/products/' + product_id);
  };

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
