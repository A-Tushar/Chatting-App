import React, { useState } from 'react'
import bg from "../assets/authentication.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {IoIosEye,IoIosEyeOff} from 'react-icons/io'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const auth = getAuth();

  let [fromdata,setfromdata]=useState({
      fullname:"",
      email:"",
      password:""
  })
  let [fullnameerroe,setfullnameerror]=useState("")
  let [emailerror,setemailerror]=useState("")
  let [passworderror,setpassworderror]=useState("")
  let [open, setopen] = useState(false);


  let handlechange =(e)=>{
    setfromdata({
      ...fromdata,
      [e.target.name]: e.target.value
    })

    setemailerror("");
    setfullnameerror("");
    setpassworderror("")
  };



  let handleauthentication =()=>{
    console.log(fromdata.fullname);
    if(!fromdata.fullname){
      setfullnameerror("Full Name Requierd")
      console.log(fullnameerroe);
    }
    if(!fromdata.email){
      setemailerror("email Requierd")
    }
    if(!fromdata.password){
      setpassworderror("Password Requierd")
    }

    if( fromdata.fullname && fromdata.email && fromdata.password){
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let namepattern =/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/

      if(!pattern.test(fromdata.email)){
        setemailerror("Need a Valid Email")
      }

      if(!namepattern.test(fromdata.fullname)){
        setfullnameerror("First & Last Name required")
      }
    }

  };

  
  return (
    <div className='authenticationpage'>
        <div className="left">
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField onChange={handlechange} name='fullname' type='text' id="outlined-basic" label="Full Name" variant="outlined" className='text'/>
                {fullnameerroe && <Alert severity="error">{fullnameerroe}</Alert>} 
                <TextField onChange={handlechange} name='email' type='email' id="outlined-basic" label="Email" variant="outlined" className='text' />
                {emailerror && <Alert severity="error">{emailerror}</Alert>}
                <TextField onChange={handlechange} name='password' type={open? "text":"password"} id="outlined-basic" label="Password" variant="outlined" className='text showeye' />
                {/* {open
                ?
                <IoIosEyeOff onClick={()=>{setopen(false)}} className='eye'/>
                :
                <IoIosEye onClick={()=>{setopen(true)}} className='eye'/>
                } */}
                
                {passworderror && <Alert severity="error">{passworderror}</Alert>}
                <Button onClick={handleauthentication} variant="contained">Sign Up</Button>
                <div className='bottomtext'>Already  have an account ? <Link to={"/login"}> <span>Sign In</span> </Link></div>
            </div>
        </div>
        <div className="right">
            <Image src={bg} alt={"Image"} className={"bg"}/>
        </div>
    </div>
  )
}

export default Registration