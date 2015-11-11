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
    $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.loryConfig = {
      method: {},
      event: {
        init: function (event, lory) {
          console.log('init');
        },
        beforeSlide: function() {},
        afterSlide: function() {},
        reInit: function() {},
        resize: function() {},
        destroy: function() {}
      }
    };
  });
