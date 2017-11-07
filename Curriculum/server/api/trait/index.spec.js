'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var traitCtrlStub = {
  index: 'traitCtrl.index',
  show: 'traitCtrl.show',
  create: 'traitCtrl.create',
  upsert: 'traitCtrl.upsert',
  patch: 'traitCtrl.patch',
  destroy: 'traitCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var traitIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './trait.controller': traitCtrlStub
});

describe('Trait API Router:', function() {
  it('should return an express router instance', function() {
    expect(traitIndex).to.equal(routerStub);
  });

  describe('GET /api/traits', function() {
    it('should route to trait.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'traitCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/traits/:id', function() {
    it('should route to trait.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'traitCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/traits', function() {
    it('should route to trait.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'traitCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/traits/:id', function() {
    it('should route to trait.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'traitCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/traits/:id', function() {
    it('should route to trait.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'traitCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/traits/:id', function() {
    it('should route to trait.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'traitCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
