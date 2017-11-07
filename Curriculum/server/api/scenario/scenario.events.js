/**
 * Scenario model events
 */

'use strict';

import {EventEmitter} from 'events';
var ScenarioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScenarioEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Scenario) {
  for(var e in events) {
    let event = events[e];
    Scenario.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ScenarioEvents.emit(event + ':' + doc._id, doc);
    ScenarioEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ScenarioEvents;
