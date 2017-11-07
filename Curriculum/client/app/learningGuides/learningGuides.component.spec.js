'use strict';

describe('Component: LearningGuidesComponent', function() {
  // load the controller's module
  beforeEach(module('curriculumApp.learningGuides'));

  var LearningGuidesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LearningGuidesComponent = $componentController('learningGuides', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
