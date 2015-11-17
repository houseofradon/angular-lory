'use strict';

angular
  .module('loryApp', ['ngLory', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'LoryController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['ngLoryConfig', function (ngLoryConfig) {
    //ngLoryConfig. = true;
    //ngLoryConfig.autoplay = false;
  }])
  .controller('LoryController', function($scope, $timeout) {
    $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.loryConfig = {
      waitForInit: true,
      startIndex: 3,
      method: {},
      event: {
        init: function (event, lory) {
          console.log('init');
        },
        beforeSlide: function() {
          console.log('before');
          console.log(arguments);
        },
        afterSlide: function() {
          console.log('after');
          console.log(arguments);
        },
        reInit: function() {},
        resize: function() {},
        destroy: function() {}
      }
    };

    $scope.setupLory = function() {
      console.log($scope.loryConfig);
      //$scope.loryConfig.method.setup();
    };
    $scope.destroy = function() {
      $scope.loryConfig.method.destroy();
    }

  });
