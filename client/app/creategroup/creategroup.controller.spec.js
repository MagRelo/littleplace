'use strict';

describe('Controller: CreategroupCtrl', function () {

  // load the controller's module
  beforeEach(module('littleplaceApp'));

  var CreategroupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreategroupCtrl = $controller('CreategroupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
