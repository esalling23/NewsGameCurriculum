'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './scenario.events';

var ScenarioSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ScenarioSchema);
export default mongoose.model('Scenario', ScenarioSchema);
