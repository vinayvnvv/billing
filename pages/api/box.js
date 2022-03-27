import connectDB from '../../middleware/mongodb';
import Box from '../../models/box';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name, bin } = req.body;
    console.log(name)
    var box = new Box({
        name: name,
        bin,
      });
    try {
      console.log(box);
      var k = await box.save();
      return res.status(200).send(k);
    } catch (err) {
      return res.status(400).send(err);
    }
  } else if(req.method === 'GET') {
    const {id, bin} = req.query;
    const filter = {};
    console.log('box get', req.query)
    if(id) {
      filter['_id'] = id;
    }
    if(bin) {
        filter['bin'] = bin;
    }
    Box.find(filter, (err, k) => {
        if(!err) {
            res.status(200).send(k);
        }
    })
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);