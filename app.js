(function() {

  var app = angular.module('store', ['ngCookies']);

  app.controller('StoreController', ['$scope', '$cookies', function($scope, $cookies) {

    $scope.products = productsData;
    $scope.cart = [];
    $scope.total = 0;
    /*
		if ($cookieStore.get('cart') !== null) {
		 		$scope.cart =  $cookieStore.get('cart');
		}
		*/

    if (!angular.isUndefined($cookies.get('total'))) {
      $scope.total = parseFloat($cookies.get('total'));
    }
    //Sepetimiz daha önceden tanımlıysa onu çekelim
    if (!angular.isUndefined($cookies.get('cart'))) {
      $scope.cart = $cookies.getObject('cart');
    }

    // $scope.cartStyle = {
    //   // "height": "100%",
    //   // "width": "250px",
    //   // "background-color": "#111",
    //   // "overflow-x": "hidden",
    //   // "transition": "0.5s",
    //   // "padding-top": "60px"
    // };

    // $scope.closeNav = function(cartStyle) {
    //     "width": "0"
    // };

    $scope.addItemToCart = function(product) {

      if ($scope.cart.length === 0) {
        product.count = 1;
        $scope.cart.push(product);
      } else {
        var repeat = false;
        for (var i = 0; i < $scope.cart.length; i++) {
          if ($scope.cart[i].id === product.id) {
            repeat = true;
            $scope.cart[i].count += 1;
          }
        }
        if (!repeat) {
          product.count = 1;
          $scope.cart.push(product);
        }
      }
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.putObject('cart', $scope.cart, {
        'expires': expireDate
      });
      $scope.cart = $cookies.getObject('cart');

      $scope.total += parseFloat(product.price);
      $cookies.put('total', $scope.total, {
        'expires': expireDate
      });
    };

    $scope.removeItemCart = function(product) {

      if (product.count > 1) {
        product.count -= 1;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, {
          'expires': expireDate
        });
        $scope.cart = $cookies.getObject('cart');
      } else if (product.count === 1) {
        var index = $scope.cart.indexOf(product);
        $scope.cart.splice(index, 1);
        expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, {
          'expires': expireDate
        });
        $scope.cart = $cookies.getObject('cart');

      }

      $scope.total -= parseFloat(product.price);
      $cookies.put('total', $scope.total, {
        'expires': expireDate
      });

    };

  }]);

  var productsData = [{
    id: 1,
    name: 'Sur Reactive Vase',
    price: 29.95,
    image: 'images/img10.jpeg'
  }, {
    id: 2,
    name: 'product2',
    price: 14.5,
    image: 'images/img11.jpeg'
  }, {
    id: 3,
    name: 'product3',
    price: 19.95,
    image: 'images/img12.jpeg'
  }, {
    id: 4,
    name: 'product4',
    price: 39.95,
    image: 'images/img14.jpeg'
  }];

})();
