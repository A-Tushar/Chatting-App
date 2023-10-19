import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import { logeduser } from '../slices/userSlice';
import { getAuth, signOut } from "firebase/auth";
import {FcHome} from "react-icons/fc"
import {BsChatDotsFill} from "react-icons/bs"
import {IoMdNotifications} from "react-icons/io"
import {FiSettings,FiLogOut} from "react-icons/fi"
import { toast } from 'react-toastify';

const Sidebar = () => {
    const userdata =useSelector((state)=>state.logedUser.value);

    const auth = getAuth();
    let nevigate = useNavigate();
    let dispatch = useDispatch();
    let data = useSelector(state=>state.logedUser.value)
    
    useEffect(()=>{
      if(!data){
        nevigate("/login")
      }
    },[])
  

      let [path,setPath]=useState("home")

      let handlelogout = ()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success('LogOut Succesfull !', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setTimeout(() => {
              localStorage.removeItem("user")
              dispatch(logeduser(null))
              nevigate("/login")
    
            }, 1000);
        }).catch((error) => {
          toast.error(' Error !', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        });
      }

  return (
    <div className="sidebar">
    <img className='profilepicture' src={userdata.photoURL}/>
    <h1>{userdata.displayName}</h1>

    <ul>
      <li onClick={()=>setPath("home")} className={path == "home"&& "active"}>
        <Link to={"/home"}><FcHome className='icons'/></Link>
      </li>
      <li onClick={()=>setPath("massage")} className={path == "massage"&& "active"}>
        <Link to={"/massage"}><BsChatDotsFill className='icons'/></Link>
      </li>
      <li onClick={()=>setPath("notification")} className={path == "notification"&& "active"}>
        <Link to={"/notifications"}><IoMdNotifications className='icons'/></Link>
      </li>
      <li onClick={()=>setPath("settings")} className={path == "settings"&& "active"}>
        <Link to={"/settings"}><FiSettings className='icons'/></Link>
      </li>
      <li ><FiLogOut onClick={handlelogout} className='icons'/></li>
    </ul>

    </div>
  )
}

export default Sidebar