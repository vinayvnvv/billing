import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var box = new Schema({
  name: {
    type: String,
    required: true
  },
  bin: {
    type: Schema.ObjectId,
    ref: 'bin'
  }
}, {timestamps:true, collection: 'box'});

mongoose.models = {};

var box = mongoose.model('box', box);

export default box;