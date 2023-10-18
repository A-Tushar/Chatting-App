import React from 'react';
import { useSelector} from 'react-redux'
import {FcHome} from "react-icons/fc"
import {BsChatDotsFill} from "react-icons/bs"

const Sidebar = () => {
    const userdata =useSelector((state)=>state.logedUser.value);
  return (
    <div className="sidebar">
    <img className='profilepicture' src={userdata.photoURL}/>
    <h1>{userdata.displayName}</h1>
    <div className="icons">
    <FcHome className='icons'/>
    <BsChatDotsFill className='icons'/>
    </div>
    </div>
  )
}

export default Sidebar