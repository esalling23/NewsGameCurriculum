'use strict';

export default class AdminController {
  scenarios: Object[];  
  newScenarioTraits: String[];

  newScenarioName = '';
  newTraitName = '';

  /*@ngInject*/
  constructor(Scenario) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('scenario');
    });
  }

  $onInit() {
    this.$http.get('/api/scenarios')
      .then(response => {
        this.scenarios = response.data;
        console.log(this.scenarios);
        this.socket.syncUpdates('scenario', this.scenarios);
      });
  }

  addTrait() {
    if(this.newTraitName) {
      this.$http.post('/api/traits', {
        name: this.newTraitName
      });
      this.newTraitName = '';
    }
  }

  addScenario() {
    if(this.newScenarioName) {
      this.$http.post('/api/scenarios', {
        name: this.newScenarioName
      });
      this.newScenarioName = '';
    } 
  }

  deleteScenario(scenario) {
    this.$http.delete(`/api/scenarios/${scenario._id}`);
  }
}
