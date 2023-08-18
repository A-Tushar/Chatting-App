import React from 'react'
import bg from "../assets/authentication.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='authenticationpage'>
        <div className="left">
            <div className='text-container'>
                <h2>Login to your account!</h2>
                <p></p>
                <TextField type='email' id="outlined-basic" label="Email" variant="outlined" className='text' />
                <TextField type='password' id="outlined-basic" label="Password" variant="outlined" className='text' />
                <Button className='loginbtn' variant="contained">Login to Continue</Button>
                <div className='bottomtext'>Don't have an account ? <Link to={"/registration"}> <span>Sign Up</span> </Link></div>
            </div>
        </div>
        <div className="right">
            <Image src={bg} alt={"Image"} className={"bg"}/>
        </div>
    </div>
  )
}

export default Login