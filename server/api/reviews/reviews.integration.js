'use strict';

var app = require('../..');
import request from 'supertest';

var newReviews;

describe('Reviews API:', function() {

  describe('GET /api/reviewss', function() {
    var reviewss;

    beforeEach(function(done) {
      request(app)
        .get('/api/reviewss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reviewss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reviewss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reviewss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reviewss')
        .send({
          name: 'New Reviews',
          info: 'This is the brand new reviews!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReviews = res.body;
          done();
        });
    });

    it('should respond with the newly created reviews', function() {
      newReviews.name.should.equal('New Reviews');
      newReviews.info.should.equal('This is the brand new reviews!!!');
    });

  });

  describe('GET /api/reviewss/:id', function() {
    var reviews;

    beforeEach(function(done) {
      request(app)
        .get('/api/reviewss/' + newReviews._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reviews = res.body;
          done();
        });
    });

    afterEach(function() {
      reviews = {};
    });

    it('should respond with the requested reviews', function() {
      reviews.name.should.equal('New Reviews');
      reviews.info.should.equal('This is the brand new reviews!!!');
    });

  });

  describe('PUT /api/reviewss/:id', function() {
    var updatedReviews;

    beforeEach(function(done) {
      request(app)
        .put('/api/reviewss/' + newReviews._id)
        .send({
          name: 'Updated Reviews',
          info: 'This is the updated reviews!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReviews = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReviews = {};
    });

    it('should respond with the updated reviews', function() {
      updatedReviews.name.should.equal('Updated Reviews');
      updatedReviews.info.should.equal('This is the updated reviews!!!');
    });

  });

  describe('DELETE /api/reviewss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reviewss/' + newReviews._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reviews does not exist', function(done) {
      request(app)
        .delete('/api/reviewss/' + newReviews._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
