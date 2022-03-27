import mongoose from 'mongoose';
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