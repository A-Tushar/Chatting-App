import React, { useState ,useEffect} from 'react'
import bg from "../assets/authentication.png"
import logo from "../assets/logo.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {IoIosEye,IoIosEyeOff} from 'react-icons/io'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {logeduser} from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'


const Registration = () => {
  const provider = new GoogleAuthProvider();
  // only eyta import korsi ar kichu kori nai 
  const auth = getAuth();
  const db = getDatabase();
  let nevigate = useNavigate()
  let data = useSelector(state=>state.logedUser.value)
  
  useEffect(()=>{
    if(data){
      nevigate("/Home")
    }
  },[]);

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
          updateProfile(auth.currentUser, {
            displayName: fromdata.fullname , 
            photoURL: "https://firebasestorage.googleapis.com/v0/b/chattingapp-fea0a.appspot.com/o/A.jpg?alt=media&token=a0a5470e-a054-4942-bb89-eefbd873ee62&_gl=1*11pau0d*_ga*MTA2ODQ0MjYyMi4xNjkxOTUwMzU3*_ga_CW55HF8NVT*MTY5NzY1MTg2My4xNS4xLjE2OTc2NTM2MDguNDkuMC4w"
          }).then(() => {

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
    
              setTimeout(() => {
                nevigate("/login")
              }, 1000);
          })
        }).then(()=>{
          set(push(ref(db, 'users')), {
            username:fromdata.fullname,
            email: fromdata.email,
            profile_picture :"https://firebasestorage.googleapis.com/v0/b/chattingapp-fea0a.appspot.com/o/A.jpg?alt=media&token=a0a5470e-a054-4942-bb89-eefbd873ee62&_gl=1*11pau0d*_ga*MTA2ODQ0MjYyMi4xNjkxOTUwMzU3*_ga_CW55HF8NVT*MTY5NzY1MTg2My4xNS4xLjE2OTc2NTM2MDguNDkuMC4w", 
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
        setload(false)
      });
    }

  };

  
  return (
    <div className='authenticationpage'>
        <div className="left">
            <div className='text-container'>
              <Image src={logo} alt={"Image"} className={"logo"}/>
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