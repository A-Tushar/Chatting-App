import React,{useState} from 'react'
import bg from "../assets/lbg.jpg"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import { RotatingLines } from 'react-loader-spinner'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  let nevigate = useNavigate()
  let [load,setload]= useState(false);
  let [emailerror,setemailerror]=useState("")
  let [passworderror,setpassworderror]=useState("")
  let [fromdata,setfromdata]=useState({
    email:"",
    password:""
  })

  let handlechange =(e)=>{
    setfromdata({
      ...fromdata,
      [e.target.name]: e.target.value
    })

    setemailerror("");
    setpassworderror("")
  };

  let handlelogin =()=>{
    if(!fromdata.email){
      setemailerror("email Requierd")
    }
    if(!fromdata.password){
      setpassworderror("Password Requierd")
    }

    if(fromdata.email && fromdata.password){
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if(!pattern.test(fromdata.email)){
        setemailerror("Need a Valid Email")
      }

      setload(true)
      signInWithEmailAndPassword(auth, fromdata.email, fromdata.password).then((user)=>{
        // console.log('');
        if(!user.user.emailVerified){
          toast.error('Please Verify Your Email !', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
          toast.success('Login Succesfull !', {
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
            nevigate("/home")
          }, 1000);
        }
    
        setfromdata({
          email:"",
          password:""
        })
        setload(false)
        // toast.success('Registration Succesfull !', {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   });

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode.includes("wrong-password")){
         setpassworderror("wrong-password")
          setload(false)
        }
        if(errorCode.includes("email")){
          setemailerror("Email Already Used !")
          setload(false)
        }
        if(errorCode.includes("user-not-found")){
          setemailerror("No Account Created !")
          toast.error('Account Not Found ! Creat an Account First.', {
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
        if(errorCode.includes("disabled")){
          toast.error('this account has been temporarily disabled due to many failed login attempts', {
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
       setload(false)
      });
    }

  };

  return (
    <div className='authenticationpage'>
        <div className="left">
            <div className='text-container'>
                <h2>Login to your account!</h2>
                <p></p>
                <TextField onChange={handlechange} name='email' type='email' id="outlined-basic" label="Email" variant="outlined" className='text' />
                {emailerror && <Alert severity="error">{emailerror}</Alert>}
                <TextField onChange={handlechange} name='password' type='password' id="outlined-basic" label="Password" variant="outlined" className='text' />
                {passworderror && <Alert severity="error">{passworderror}</Alert>}
                {load ?
                <Button variant="contained">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="32"
                  visible={true}
                />
                </Button>
                :
                <Button onClick={handlelogin} className='loginbtn' variant="contained">Login to Continue</Button>
                }
                <div className='bottomtext'>Don't have an account ? <Link to={"/"}> <span>Sign Up</span> </Link></div>
            </div>
        </div>
        <div className="right">
            <Image src={bg} alt={"Image"} className={"bg"}/>
        </div>
    </div>
  )
}

export default Login