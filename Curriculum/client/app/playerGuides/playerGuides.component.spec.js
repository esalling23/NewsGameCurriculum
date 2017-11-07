'use strict';

describe('Component: PlayerGuidesComponent', function() {
  // load the controller's module
  beforeEach(module('curriculumApp.playerGuides'));

  var PlayerGuidesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PlayerGuidesComponent = $componentController('playerGuides', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
