import mongoose from 'mongoose';
require('./../models/bin')
require('./../models/box')
require('./../models/item')
require('./../models/entry')
console.log('middle')
const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then((r) => {
    console.log('connedt')
  });
  return handler(req, res);
};

export default connectDB;