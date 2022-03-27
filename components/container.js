import { useState, useEffect } from "react";

const Container = ({
    bins, setBins  
}) => {
    // const [bins, setBins] = useState([]);
    const [selectedBin, setSelectedBin] = useState(null);
    const [boxes, setBoxes] = useState([]);
    const [binName, setBinName] = useState('');
    const [boxName, setBoxName] = useState('');
    useEffect(() => {
        fetchBins();
    }, [])
    const fetchBins = () => {
        fetch('/api/bin').then(r => r.json()).then((response) => {
            setBins(response);
            if(!selectedBin && Array.isArray(response) && response.length > 0) {
                fetchBox(response[0]);
            }
        })
    }
    const fetchBox = (bin) => {
        setSelectedBin(bin)
        fetch('/api/box?bin=' + bin._id).then(r => r.json()).then((response) => {
            setBoxes(response);
        })
    }
    const addBin = () => {
        fetch('/api/bin', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: binName})})
            .then(r => r.json())
            .then(r => {
                if(r._id) {
                    setBins([...bins, r]);
                    setBinName('')
                    if(!selectedBin) {
                        setSelectedBin(r) 
                    }
                }
            })
    }
    const addBox = () => {
        fetch('/api/box', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: boxName, bin: selectedBin._id})})
        .then(r => r.json())
        .then(r => {
            if(r._id) {
                setBoxes([...boxes, r]);
                setBoxName('')
            }
        })
    }
    return <div>
        <h1>Container</h1>
        <div className="row">
            <div className="col">
                Bins
                <div className="list-group">
                {bins.map(b => 
                    <div className={"list-group-item list-group-item-action " + (selectedBin?._id === b._id ? 'active' : '')} onClick={() => fetchBox(b)} key={b._id}>{b.name} <small>({b._id})</small></div>
                )}
                </div>
                <br />
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Add New Bin" value={binName} onChange={(e) => setBinName(e.target.value)} />
                    <button className="btn btn-outline-secondary" onClick={addBin} type="button">Add Bin</button>
                </div>
                
            </div>
            <div className="col">
                Boxes({selectedBin?.name})
                <div className="list-group">
                    {boxes.map(b => 
                        <div className="list-group-item" key={b._id}>{b.name} <small>({b._id})</small></div>
                    )}
                </div>
                <br />
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Add New Box" value={boxName} onChange={(e) => setBoxName(e.target.value)} />
                    <button className="btn btn-outline-secondary" onClick={addBox} type="button">Add Box</button>
                </div>
            </div>
        </div>
    </div>
}

export default Container;