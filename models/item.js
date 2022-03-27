import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var item = new Schema({
  name: {
    type: String,
    required: true
  },
}, {timestamps:true, collection: 'item' });

mongoose.models = {};

var item = mongoose.model('item', item);

export default item;