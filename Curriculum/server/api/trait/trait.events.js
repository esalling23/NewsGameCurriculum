/**
 * Trait model events
 */

'use strict';

import {EventEmitter} from 'events';
var TraitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TraitEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Trait) {
  for(var e in events) {
    let event = events[e];
    Trait.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    TraitEvents.emit(event + ':' + doc._id, doc);
    TraitEvents.emit(event, doc);
  };
}

export {registerEvents};
export default TraitEvents;
