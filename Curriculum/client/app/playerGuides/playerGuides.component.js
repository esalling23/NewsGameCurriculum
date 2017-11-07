'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './playerGuides.routes';

export class PlayerGuidesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('curriculumApp.playerGuides', [uiRouter])
  .config(routes)
  .component('playerGuides', {
    template: require('./playerGuides.html'),
    controller: PlayerGuidesComponent,
    controllerAs: 'playerGuidesCtrl'
  })
  .name;
