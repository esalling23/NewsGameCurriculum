'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var scenarioCtrlStub = {
  index: 'scenarioCtrl.index',
  show: 'scenarioCtrl.show',
  create: 'scenarioCtrl.create',
  upsert: 'scenarioCtrl.upsert',
  patch: 'scenarioCtrl.patch',
  destroy: 'scenarioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scenarioIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './scenario.controller': scenarioCtrlStub
});

describe('Scenario API Router:', function() {
  it('should return an express router instance', function() {
    expect(scenarioIndex).to.equal(routerStub);
  });

  describe('GET /api/scenarios', function() {
    it('should route to scenario.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'scenarioCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/scenarios/:id', function() {
    it('should route to scenario.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'scenarioCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/scenarios', function() {
    it('should route to scenario.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'scenarioCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/scenarios/:id', function() {
    it('should route to scenario.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'scenarioCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/scenarios/:id', function() {
    it('should route to scenario.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'scenarioCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/scenarios/:id', function() {
    it('should route to scenario.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'scenarioCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
