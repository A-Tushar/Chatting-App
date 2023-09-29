import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import Image from '../components/Image'


const Forgetpassword = () => {
  const auth = getAuth();
  let [email, setemail]= useState("")
  let nevigate = useNavigate()

  

  let handleforgetpass= ()=>{

  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    toast.success(' Reset Email Sent !', {
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
  })
  .catch((error) => {
    toast.error(' Something went Wrong !', {
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
    <div className="forgetpage">
      <div className="forgetbox">
        <Image src={logo} alt={"Image"} className={"logo"}/>
        <h3> Reset Your Password !</h3>
        <TextField onChange={(e)=>setemail(e.target.value)} id="standard-basic" label="Your Email" variant="standard" /> <br />
        <Button onClick={handleforgetpass} variant="contained">Reset</Button>
      </div>
    </div>
  )
}

export default Forgetpassword