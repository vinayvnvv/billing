import { useState } from "react";
import Container from '../components/container'
import Entry from '../components/entry'
import Item from '../components/item'
import Query from '../components/query'

export default function Home() {
  const [bins, setBins] = useState([]);
  const [items, setItems] = useState([]);
  return (
    <div className='main'>
      <div className='top'>
        <Container bins={bins} setBins={setBins}/>
        <Item items={items} setItems={setItems}/>
        <Entry bins={bins} setBins={setBins} items={items} setItems={setItems}/>
      </div>
      <div className='top'>
        <Query />
      </div>
    </div>
  )
}
