'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('playerGuides', {
      url: '/playerGuides',
      template: '<player-guides></player-guides>'
    });
}
