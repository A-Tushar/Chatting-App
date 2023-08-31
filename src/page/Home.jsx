import React from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const auth = getAuth();
  let nevigate = useNavigate()
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
    <>
     <h1>Under constraction !!! </h1>
     <Button onClick={handlelogout} variant="contained">Sing Out</Button>
    </>
  )
}

export default Home