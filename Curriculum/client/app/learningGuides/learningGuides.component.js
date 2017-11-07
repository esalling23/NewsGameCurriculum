'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './learningGuides.routes';

export class LearningGuidesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('curriculumApp.learningGuides', [uiRouter])
  .config(routes)
  .component('learningGuides', {
    template: require('./learningGuides.html'),
    controller: LearningGuidesComponent,
    controllerAs: 'learningGuidesCtrl'
  })
  .name;
