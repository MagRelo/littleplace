'use strict';

describe('Service: reviewService', function () {

  // load the service's module
  beforeEach(module('littleplaceApp'));

  // instantiate service
  var reviewService;
  beforeEach(inject(function (_reviewService_) {
    reviewService = _reviewService_;
  }));

  it('should do something', function () {
    expect(!!reviewService).toBe(true);
  });

});
