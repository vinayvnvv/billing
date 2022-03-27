import {useState} from 'react';
const Query = () => {
    const [q, setQ] = useState('');
    const [result, setResult] = useState(null);
    const getResult = () => {
        setResult(null)
        fetch('/api/query?item=' + q)
            .then(r => r.json())
            .then(res => {
                setResult(res)
                setQ('')
            });
    }
    const reset = () => {
        if(confirm('Are you Sure?')) {
            fetch('/api/query?reset=true')
            .then(r => r.json())
            .then(res => {
                location.reload()
            });
        }
    }
    return <div>
        <h1>Query</h1>
        <div className="input-group mb-3" style={{maxWidth: 400}}>
            <input type="text" className="form-control" placeholder="Add Item Code"  value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="btn btn-outline-secondary" onClick={getResult} type="button">Find Item</button>
        </div>
        {result && <><h3>Result</h3><table className="table">
            <thead>
                <tr>
                    <th scope="col">Bin</th>
                    <th scope="col">Box</th>
                    <th scope="col">Item</th>
                </tr>
            </thead>
            <tbody>
                {result.map((b, idx) => <tr key={b._id}>
                    <td>{b.bin.name}</td>
                    <td>{b.box.name}</td>
                    <td>{b.item.name}</td>
                </tr>
                )}
            </tbody>
        </table></>}
        
        <button className="btn btn-danger" onClick={reset}>Reset All Data</button>
    </div>
}

export default Query;