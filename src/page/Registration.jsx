import React, { useState } from 'react'
import bg from "../assets/authentication.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {IoIosEye,IoIosEyeOff} from 'react-icons/io'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  let [load,setload]= useState(false)


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
    }
    if(!fromdata.email){
      setemailerror("email Requierd")
    }
    if(!fromdata.password){
      setpassworderror("Password Requierd")
    }

    if( fromdata.fullname && fromdata.email && fromdata.password){
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // let namepattern =/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/

      if(!pattern.test(fromdata.email)){
        setemailerror("Need a Valid Email")
      }

      // if(!namepattern.test(fromdata.fullname)){
      //   setfullnameerror("First & Last Name required")
      // }
      setload(true)
      createUserWithEmailAndPassword(auth, fromdata.email, fromdata.password).then(()=>{
        console.log("done");
        sendEmailVerification(auth.currentUser).then(()=>{
    
        setfromdata({
          fullname:"",
          email:"",
          password:""
        })
        setload(false)
        toast.success('Registration Succesfull !', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        })

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode.includes("email")){
          setemailerror("Email Already Used !")
          toast.error('Email Already Used !', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setload(false)
        }
        console.log(errorCode,errorMessage);
       
      });
    }

  };

  
  return (
    <div className='authenticationpage'>
        <div className="left">
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField onChange={handlechange} name='fullname' type='text' id="outlined-basic" label="Full Name" variant="outlined" className='text'value={fromdata.fullname}/>
                {fullnameerroe && <Alert severity="error">{fullnameerroe}</Alert>} 
                <TextField onChange={handlechange} name='email' type='email' id="outlined-basic" label="Email" variant="outlined" className='text' value={fromdata.email}/>
                {emailerror && <Alert severity="error">{emailerror}</Alert>}
                <TextField onChange={handlechange} name='password' type={open? "text":"password"} id="outlined-basic" label="Password" variant="outlined" className='text showeye'value={fromdata.password} />
                {/* {open
                ?
                <IoIosEyeOff onClick={()=>{setopen(false)}} className='eye'/>
                :
                <IoIosEye onClick={()=>{setopen(true)}} className='eye'/>
                } */}
                
                {passworderror && <Alert severity="error">{passworderror}</Alert>}

                {load ?
                <Button onClick={handleauthentication} variant="contained">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="32"
                  visible={true}
                />
                </Button>
                :
                <Button onClick={handleauthentication} variant="contained">
                Sign Up</Button>
                }
                
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