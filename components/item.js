import { useState, useEffect } from "react";

const Item = ({items, setItems}) => {
    // const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    useEffect(() => {
        fetchItems();
    }, [])
    const fetchItems = () => {
        fetch('/api/item').then(r => r.json()).then((response) => {
            setItems(response);
        })
    }
    const addItem = () => {
        fetch('/api/item', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: itemName})})
            .then(r => r.json())
            .then(r => {
                if(r._id) {
                    setItems([...items, r]);
                    setItemName('')
                }
            })
    }
    return <div>
        <h1>Items</h1>
        <div>
                <div className="list-group">
                    {items.map(b => 
                        <div className="list-group-item" key={b._id}>{b.name} <small>({b._id})</small></div>
                    )}
                </div>
                <br />
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Add New Item"  value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    <button className="btn btn-outline-secondary" onClick={addItem} type="button">Add Item</button>
                </div>
        </div>
    </div>
}

export default Item;