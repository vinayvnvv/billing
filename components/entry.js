import { useState, useEffect } from "react";

const Entry = ({bins, setBins, items, setItems}) => {
    const [entry, setEntry] = useState([]);
    // const [bins, setBins] = useState([]);
    const [boxes, setBoxes] = useState([]);
    // const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({item: null, bin: null, box: null});
    // const [itemName, setItemName] = useState('');
    useEffect(() => {
        fetchEntry();
        fetchBins();
        fetchItems();
    }, [])
    const fetchEntry = () => {
        fetch('/api/entry').then(r => r.json()).then((response) => {
            setEntry(response);
        })
    }
    const fetchBins = () => {
        fetch('/api/bin').then(r => r.json()).then((response) => {
            setBins(response);
            if(boxes.length === 0) {
                fetchBox(response[0]?._id);
            }
        })
    } 
    const fetchItems = () => {
        fetch('/api/item').then(r => r.json()).then((response) => {
            setItems(response);
        })
    }
    const fetchBox = (id) => {
        fetch('/api/box?bin=' + id).then(r => r.json()).then((response) => {
            setBoxes(response);
        })
    }
    const addEntry = () => {
        if(selected.bin && selected.box && selected.item) {
            fetch('/api/entry', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...selected})})
            .then(r => r.json())
            .then(r => {
                setSelected({item: null, bin: null, box: null})
                fetchEntry();
            })
        }
        
    }
    const onChange = (f, t) => {
        const newV = {...selected, [f]: t};
        if(f === 'bin') {
            setBoxes([]);
            fetchBox(t);
            newV['box'] = null;
        }
        setSelected(newV)
        console.log(f, t)
    }
    return <div style={{padding: 11}}>
        <h1>Entries</h1>
        <div style={{padding: 11}}>
                 <div className="row">
                     <div className="col">Select Bin</div>
                     <div className="col">Select Box</div>
                     <div className="col">Select Item</div>
                 </div>
                <div className="row">
                    <select className="form-select col" onChange={(e) => onChange('bin', e.target.value)}>
                        {bins.map(b =>
                            <option key={b._id} value={b._id}>{b.name}</option>
                        )}
                    </select>
                    <select className="form-select col" onChange={(e) => onChange('box', e.target.value)}>
                        {boxes.map(b =>
                            <option key={b._id} value={b._id}>{b.name}</option>
                        )}
                    </select>
                    <select className="form-select col" onChange={(e) => onChange('item', e.target.value)}>
                        {items.map(b =>
                            <option key={b._id} value={b._id}>{b.name}</option>
                        )}
                    </select>
                    <button style={{marginTop: 5}}  className="btn btn-secondary" onClick={addEntry}>Add Entry</button>
                </div>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Bin</th>
                        <th scope="col">Box</th>
                        <th scope="col">Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entry.map((b, idx) => 
                            <tr key={b._id}>
                                <td>{b.bin.name}</td>
                                <td>{b.box.name}</td>
                                <td>{b.item.name}</td>
                            </tr>
                        )}
                    </tbody>
                 </table>
                {/* <div>
                    <input value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    <button onClick={addItem}>Add bin</button>
                </div> */}
        </div>
    </div>
}

export default Entry;