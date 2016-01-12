'use strict';

describe('Controller: JoingroupCtrl', function () {

  // load the controller's module
  beforeEach(module('littleplaceApp'));

  var JoingroupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JoingroupCtrl = $controller('JoingroupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
