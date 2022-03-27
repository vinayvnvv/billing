import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var entry = new Schema({
  item: {
    type: Schema.ObjectId,
    ref: 'item'
  },
  box: {
    type: Schema.ObjectId,
    ref: 'box'
  },
  bin: {
    type: Schema.ObjectId,
    ref: 'bin'
  },
}, {timestamps:true, collection: 'entry' });

mongoose.models = {};

var entry = mongoose.model('entry', entry);

export default entry;