import React from 'react'

export default function Header(props) {
    const topCoin = props.data[0]

  return (
    <div className='header'>
        <h1>Cryptocurrency Info</h1>
        <h3>the current top coin is {topCoin.name}</h3>
    </div>
  )
}
