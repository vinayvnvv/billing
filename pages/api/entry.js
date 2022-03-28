import connectDB from '../../middleware/mongodb';
import Entry from '../../models/entry';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {item, bin, box } = req.body;
    var entry = new Entry({
        item,
        bin,
        box,
      });
    try {
      console.log(entry);
      var k = await entry.save();
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
    Entry.find(filter).populate('box').populate('item').populate('bin').exec((err, doc) =>{
        if(err){
           console.log(err)
           return res.status(400).send(err);
        } else{
            return res.status(200).send(doc);
        }
     });
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);