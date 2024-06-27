import React from 'react';
import { Link } from 'react-router-dom';

export default function Data(props) {

  if (!props.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='data-container'>
      {props.data.map((val, index) => (
        <Link to={`https://www.google.com/search?q=${val.name}`} style={{textDecoration:"none"}} target='blank'>
          <div key={index} className='coin-box'>
            <p>{index+1}. {val.name}</p>
            <p>Market Cap: {val.market_cap}</p>
          </div>
        </Link>
      ))}
    </div>
    
  );
}