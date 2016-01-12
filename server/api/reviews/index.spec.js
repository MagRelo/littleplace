'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reviewsCtrlStub = {
  index: 'reviewsCtrl.index',
  show: 'reviewsCtrl.show',
  create: 'reviewsCtrl.create',
  update: 'reviewsCtrl.update',
  destroy: 'reviewsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reviewsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reviews.controller': reviewsCtrlStub
});

describe('Reviews API Router:', function() {

  it('should return an express router instance', function() {
    reviewsIndex.should.equal(routerStub);
  });

  describe('GET /api/reviewss', function() {

    it('should route to reviews.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reviewsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reviewss/:id', function() {

    it('should route to reviews.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reviewsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reviewss', function() {

    it('should route to reviews.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reviewsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reviewss/:id', function() {

    it('should route to reviews.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reviewsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reviewss/:id', function() {

    it('should route to reviews.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reviewsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reviewss/:id', function() {

    it('should route to reviews.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reviewsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
