'use strict';

angular
  .module('loryApp', ['ngLory', 'ngRoute', 'hljs'])
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
  .controller('LoryController', function($scope, $timeout, $window) {

    $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    $window.hljs.initHighlightingOnLoad();

    $scope.loryConfig = {
      infinite: 1,
      event: {
        beforeSlide: function() {
        },
        afterSlide: function() {
        },
        touchEnd: function(event) {
        },
        touchMove: function(event) {
        },
        touchStart: function(event) {
        }
      }
    };

    $scope.loryConfigMethods = {
      infinite: 1,
      method: {},
    };

    $scope.next = function() {
      $scope.loryConfigMethods.method.next();
    };

    $scope.prev = function() {
      $scope.loryConfig.methodMethods.prev();
    };

    $scope.events = [];

    function handleEvent(e) {
      var time = new Date();
      time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ',' + time.getMilliseconds();
      $scope.events.push('[' + time + '] Event dispatched: "' + e.type + '"');
      $scope.$apply();
    }

    $scope.loryConfigEvents = {
      infinite: 1,
      method: {},
      event: {
        init: handleEvent,
        beforeSlide: handleEvent,
        afterSlide: handleEvent,
        reInit: function(event) {},
        resize: function(event) {},
        destroy: function(event) {}
      }
    };


    $scope.setupLory = function() {
      //$scope.loryConfig.method.setup();
    };
    $scope.destroy = function() {
      $scope.loryConfig.method.destroy();
    };

  });
