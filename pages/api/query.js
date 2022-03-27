import connectDB from '../../middleware/mongodb';
import Entry from '../../models/entry';
import Item from '../../models/item';
import Box from '../../models/box';
import Bin from '../../models/bin';
const handler = async (req, res) => {
    if(req.method === 'GET') {
        console.log(req.query)
        const {item, reset} = req.query;
        if(reset) {
            Entry.remove({}, () => {
                Item.remove({}, () => {
                    Box.remove({}, () => {
                        Bin.remove({}, () => {
                            return res.status(200).send({success: true});
                        })
                    })
                })
            })
            
            return;
        }
        Entry.find({item}).populate('box').populate('item').populate('bin').exec((err, doc) =>{
            if(err){
               console.log(err)
            } else{
                return res.status(200).send(doc);
            }
         });
    } else {
        res.status(422).send('err');
    }
};

export default connectDB(handler);