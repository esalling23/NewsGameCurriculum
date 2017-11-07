'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newScenario;

describe('Scenario API:', function() {
  describe('GET /api/scenarios', function() {
    var scenarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/scenarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scenarios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(scenarios).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/scenarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scenarios')
        .send({
          name: 'New Scenario',
          info: 'This is the brand new scenario!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScenario = res.body;
          done();
        });
    });

    it('should respond with the newly created scenario', function() {
      expect(newScenario.name).to.equal('New Scenario');
      expect(newScenario.info).to.equal('This is the brand new scenario!!!');
    });
  });

  describe('GET /api/scenarios/:id', function() {
    var scenario;

    beforeEach(function(done) {
      request(app)
        .get(`/api/scenarios/${newScenario._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scenario = res.body;
          done();
        });
    });

    afterEach(function() {
      scenario = {};
    });

    it('should respond with the requested scenario', function() {
      expect(scenario.name).to.equal('New Scenario');
      expect(scenario.info).to.equal('This is the brand new scenario!!!');
    });
  });

  describe('PUT /api/scenarios/:id', function() {
    var updatedScenario;

    beforeEach(function(done) {
      request(app)
        .put(`/api/scenarios/${newScenario._id}`)
        .send({
          name: 'Updated Scenario',
          info: 'This is the updated scenario!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScenario = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScenario = {};
    });

    it('should respond with the updated scenario', function() {
      expect(updatedScenario.name).to.equal('Updated Scenario');
      expect(updatedScenario.info).to.equal('This is the updated scenario!!!');
    });

    it('should respond with the updated scenario on a subsequent GET', function(done) {
      request(app)
        .get(`/api/scenarios/${newScenario._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let scenario = res.body;

          expect(scenario.name).to.equal('Updated Scenario');
          expect(scenario.info).to.equal('This is the updated scenario!!!');

          done();
        });
    });
  });

  describe('PATCH /api/scenarios/:id', function() {
    var patchedScenario;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/scenarios/${newScenario._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Scenario' },
          { op: 'replace', path: '/info', value: 'This is the patched scenario!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScenario = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScenario = {};
    });

    it('should respond with the patched scenario', function() {
      expect(patchedScenario.name).to.equal('Patched Scenario');
      expect(patchedScenario.info).to.equal('This is the patched scenario!!!');
    });
  });

  describe('DELETE /api/scenarios/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/scenarios/${newScenario._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when scenario does not exist', function(done) {
      request(app)
        .delete(`/api/scenarios/${newScenario._id}`)
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
