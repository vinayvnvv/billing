import connectDB from '../../middleware/mongodb';
import Bin from '../../models/bin';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name} = req.body;
    console.log(name)
    var bin = new Bin({
        name: name,
      });
    try {
      console.log(bin);
      var k = await bin.save();
      return res.status(200).send(k);
    } catch (err) {
      return res.status(400).send(err);
    }
  } else if(req.method === 'GET') {
    const {id} = req.query;
    const filter = {};
    if(id) {
      filter['_id'] = id;
    }
    Bin.find(filter, (err, k) => {
        if(!err) {
            res.status(200).send(k);
        }
    })
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);