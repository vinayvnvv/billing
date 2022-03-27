import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var bin = new Schema({
  name: {
    type: String,
    required: true
  },
}, {timestamps:true, collection: 'bin' });

mongoose.models = {};

var bin = mongoose.model('bin', bin);

export default bin;