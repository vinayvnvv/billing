import connectDB from '../../middleware/mongodb';
import Item from '../../models/item';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name} = req.body;
    console.log(name)
    var item = new Item({
        name: name,
      });
    try {
      console.log(item);
      var k = await item.save();
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
    Item.find(filter, (err, k) => {
        if(!err) {
            res.status(200).send(k);
        }
    })
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);