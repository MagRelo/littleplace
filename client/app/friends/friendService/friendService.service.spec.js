'use strict';

describe('Service: friendService', function () {

  // load the service's module
  beforeEach(module('littleplaceApp'));

  // instantiate service
  var friendService;
  beforeEach(inject(function (_friendService_) {
    friendService = _friendService_;
  }));

  it('should do something', function () {
    expect(!!friendService).toBe(true);
  });

});
