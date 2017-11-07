/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Scenario from '../api/scenario/scenario.model';
import Trait from '../api/trait/trait.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Trait.find({}).remove()
      .then(() => {
        let trait = Trait.create({
          name: 'Development Tools',
          info: ''
        }, {
          name: 'Server and Client integration',
          info: ''
        }, {
          name: 'Smart Build System',
          info: ''
        }, {
          name: 'Modular Structure',
          info: ''
        }, {
          name: 'Optimized Build',
          info: ''
        }, {
          name: 'Deployment Ready',
          info: ''
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));
  
    Scenario.find({}).remove()
      .then(() => {
        let scenario = Scenario.create({
          name: 'Development Tools',
          info: ''
        }, {
          name: 'Server and Client integration',
          info: ''
        }, {
          name: 'Smart Build System',
          info: ''
        }, {
          name: 'Modular Structure',
          info: ''
        }, {
          name: 'Optimized Build',
          info: ''
        }, {
          name: 'Deployment Ready',
          info: ''
        });
        return scenario;
      })
      .then(() => console.log('finished populating scenarios'))
      .catch(err => console.log('error populating scenarios', err));
  

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
