'use strict';

describe('angular lory testing', function() {
  var scope, $rootScope, $compile, $timeout, $injector;

  beforeEach(module('ngLory'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_, _$injector_) {

    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    $timeout = _$timeout_;
    $injector = _$injector_;

    scope.data = [
      {id: 1, title: 'Foo', content: 'Bar'}
    ];

  }));

  // DSL (domain-specific language)
  function compileTemplate(template) {
    var el = $compile(angular.element(template))(scope);
    scope.$digest();
    return el;
  }

  it('should init', function() {
    var element = compileTemplate('\
    <lory>\
    <div> 1 </div>\
    <div> 2 </div>\
    </lory>');
    scope.$digest();
    console.log(element)
    expect(element.hasClass('').toBe(true));
  });

})
