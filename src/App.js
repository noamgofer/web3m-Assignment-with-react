import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import Data from './components/Data';
import CoinChart from './components/CoinChart';
import Header from './components/Header';

function App() {
  
  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  const [data,setData]=useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL)
      result.json().then(json => {
        setData(json)
      })
    }
    fetchData();
  }, []);

  if (!data) {
    return <div className='loadingMsg'>Loading...</div>; 
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header data={data}/>
      <div className='flex-container'>
        <Data data={data}/>
        <CoinChart data={data}/>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
