'use strict';

angular
  .module('ngLory', [])
  //global config
  .constant('ngLoryConfig', {
    method: {},
    event: {}
  })
  .directive('lory', ['$window', '$timeout', 'ngLoryConfig', function($window, $timeout, ngLoryConfig) {
    var loryMethodList = [
      'prev',
      'next',
      'slideTo',
      'returnIndex',
      'setup',
      'reset',
      'destroy'
    ];
    var loryEventList = [
      'before.lory.init',
      'after.lory.init',
      'before.lory.slide',
      'after.lory.slide',
      'after.lory.transition',
      'on.lory.resize',
      'on.lory.touchstart',
      'on.lory.touchmove',
      'on.lory.touchend',
      'on.lory.destroy'
    ];

    return {
      scope: {
        settings: '=',
        slidesToScroll: '@',
        infinite: '@',
        rewind: '@',
        slideSpeed: '@',
        rewindSpeed: '@',
        snapBackSpeed: '@',
        ease: '@',
        classNameFrame: '@',
        classNameSlideContainer: '@',
        classNamePrevCtrl: '@',
        classNameNextCtrl: '@'
      },
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {

        angular.element(element).css('display', 'none');

        var lorySlider, options, initOptions, destroy, init, destroyAndInit, currentIndex, setMethods;
        var firstRun = true;

        initOptions = function() {
          options = angular.extend(angular.copy(ngLoryConfig), {
            // Custom options
            waitForInit: scope.initOnStart || false,
            startIndex: scope.startIndex || undefined,
            // Lory options
            enableMouseEvents: scope.enableMouseEvents || true,
            slidesToScroll: !isNaN(parseInt(scope.slidesToScroll, 10)) ? parseInt(scope.slidesToScroll, 10) : 1,
            infinite: !isNaN(parseInt(scope.infinite, 10)) ? parseInt(scope.infinitve, 10) : 1,
            rewind: !isNaN(parseInt(scope.rewind, 10)) ? parseInt(scope.rewind, 10) : false,
            slideSpeed: !isNaN(parseInt(scope.slideSpeed, 10)) ? parseInt(scope.slideSpeed, 10) : 300,
            rewindSpeed: !isNaN(parseInt(scope.rewindSpeed, 10)) ? parseInt(scope.rewindSpeed, 10) : 600,
            snapBackSpeed: !isNaN(parseInt(scope.snapBackSpeed, 10)) ? parseInt(scope.snapBackSpeed, 10) : 200,
            ease: scope.cssEase || 'ease',
            classNameFrame: scope.ClassNameFrame || 'js_frame',
            classNameSlideContainer: scope.classNameSlideContainer || 'js_slides',
            classNamePrevCtrl: scope.classNamePrevCtrl || 'js_prev',
            classNameNextCtrl: scope.classNameNextCtrl || 'js_next'
          }, scope.settings);
        };

        destroy = function() {
          var loryElement = angular.element(element);
          if (lorySlider) {
            // remove Lory
            lorySlider.destroy();
            lorySlider = undefined;
            angular.element(element).css('display', 'none');
          }
          return loryElement;
        };

        init = function() {
          initOptions();
          var loryElement = angular.element(element)[0];
          if (lorySlider) {
            lorySlider.reset();
          } else {

            angular.element(element).css('display', 'block');
            loryElement.addEventListener('after.lory.init', function(event) {

              if(typeof options.event.afterInit === 'function') {
                options.event.afterInit(event)
              }

              if (typeof currentIndex !== 'undefined') {
                $timeout(function() {
                  lorySlider.slideTo(currentIndex);
                  return;
                },0);
              }
            });

            $timeout(function() {
              currentIndex = options.startIndex;
              lorySlider = $window.lory(loryElement, options);
            }, 0);

         }

          // arguments: currentSlide, nextSlide
          // fires before slide change
          loryElement.addEventListener('before.lory.slide', function(event) {
            if (typeof options.event.beforeSlide === 'function') {
              options.event.beforeSlide(event, event.detail.index, event.detail.nextSlide, lorySlider, loryElement);
            }
          });

          loryElement.addEventListener('after.lory.slide', function(event) {
            if (typeof options.event.afterSlide === 'function') {
              options.event.afterSlide(event, event.detail.currentSlide, lorySlider, loryElement);
            }
          });

          if (typeof options.event.transition === 'function') {
            loryElement.addEventListener('after.lory.transition', function(event) {
              options.event.transition(event, lorySlider, loryElement);
            });
          }

          if (typeof options.event.resize === 'function') {
            loryElement.addEventListener('on.lory.resize', function(event) {
              options.event.resize(event, lorySlider, loryElement);
            });
          }

          if (typeof options.event.touchEnd === 'function') {
            loryElement.addEventListener('on.lory.touchend', function(event) {
              options.event.touchEnd(event);
            });
          }

          if (typeof options.event.touchMove === 'function') {
            loryElement.addEventListener('on.lory.touchmove', function(event) {
              options.event.touchMove(event);
            });
          }
          if (typeof options.event.touchStart === 'function') {
            loryElement.addEventListener('on.lory.touchstart', function(event) {
              options.event.touchStart(event);
            });
          }

          if (typeof options.event.destroy === 'function') {
            loryElement.addEventListener('after.lory.destroy', function(event) {
              options.event.destroy(event, lorySlider, loryElement);
            });
          }

        };

        destroyAndInit = function () {
          destroy();
          init();
        };

        setMethods = function(methods) {
          scope.internalControl = methods || {};

          // Method
          loryMethodList.forEach(function (value) {
            scope.internalControl[value] = function () {
              var args;
              args = Array.prototype.slice.call(arguments);
              args.unshift(value);
              if (value === 'setup') {
                return destroyAndInit();
              } else if (value === 'destroy') {
                return destroy();
              } else {
                if (!lorySlider) {
                  console.warn('you need to instantiate lory first');
                  return;
                }
                lorySlider[value](args[args.length - 1]);
              }

            };
          });

        };

        element.one('$destroy', function () {
          destroy();
        });

        return scope.$watch('settings', function (newVal, oldVal) {
          if (newVal !== null && newVal !== undefined) {
            setMethods(newVal.method);
          }

          if (newVal !== null && newVal !== undefined && !newVal.waitForInit) {
            return destroyAndInit();
          }

        }, true);

      }
    };

  }]);
