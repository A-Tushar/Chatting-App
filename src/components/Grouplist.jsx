import React from 'react'
import Image from './Image'
import gimg from '../assets/img.png'

const Grouplist = () => {
  return (
    <>
    <div className="box">
        <h2>Groups List</h2>
        <div className='list'>
        <Image src={gimg}/>
        <h3>Friends Forever</h3>
        <button>JOIN</button>
        </div>
    </div>
    </>
  )
}

export default Grouplist