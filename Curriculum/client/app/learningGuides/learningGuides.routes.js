'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('learningGuides', {
      url: '/learningGuides',
      template: '<learning-guides></learning-guides>'
    });
}
