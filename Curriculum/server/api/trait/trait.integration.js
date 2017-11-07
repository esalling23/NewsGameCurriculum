'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTrait;

describe('Trait API:', function() {
  describe('GET /api/traits', function() {
    var traits;

    beforeEach(function(done) {
      request(app)
        .get('/api/traits')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          traits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(traits).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/traits', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/traits')
        .send({
          name: 'New Trait',
          info: 'This is the brand new trait!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTrait = res.body;
          done();
        });
    });

    it('should respond with the newly created trait', function() {
      expect(newTrait.name).to.equal('New Trait');
      expect(newTrait.info).to.equal('This is the brand new trait!!!');
    });
  });

  describe('GET /api/traits/:id', function() {
    var trait;

    beforeEach(function(done) {
      request(app)
        .get(`/api/traits/${newTrait._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trait = res.body;
          done();
        });
    });

    afterEach(function() {
      trait = {};
    });

    it('should respond with the requested trait', function() {
      expect(trait.name).to.equal('New Trait');
      expect(trait.info).to.equal('This is the brand new trait!!!');
    });
  });

  describe('PUT /api/traits/:id', function() {
    var updatedTrait;

    beforeEach(function(done) {
      request(app)
        .put(`/api/traits/${newTrait._id}`)
        .send({
          name: 'Updated Trait',
          info: 'This is the updated trait!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTrait = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrait = {};
    });

    it('should respond with the updated trait', function() {
      expect(updatedTrait.name).to.equal('Updated Trait');
      expect(updatedTrait.info).to.equal('This is the updated trait!!!');
    });

    it('should respond with the updated trait on a subsequent GET', function(done) {
      request(app)
        .get(`/api/traits/${newTrait._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let trait = res.body;

          expect(trait.name).to.equal('Updated Trait');
          expect(trait.info).to.equal('This is the updated trait!!!');

          done();
        });
    });
  });

  describe('PATCH /api/traits/:id', function() {
    var patchedTrait;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/traits/${newTrait._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Trait' },
          { op: 'replace', path: '/info', value: 'This is the patched trait!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTrait = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTrait = {};
    });

    it('should respond with the patched trait', function() {
      expect(patchedTrait.name).to.equal('Patched Trait');
      expect(patchedTrait.info).to.equal('This is the patched trait!!!');
    });
  });

  describe('DELETE /api/traits/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/traits/${newTrait._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trait does not exist', function(done) {
      request(app)
        .delete(`/api/traits/${newTrait._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
