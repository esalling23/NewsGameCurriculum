'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './trait.events';

var TraitSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(TraitSchema);
export default mongoose.model('Trait', TraitSchema);
