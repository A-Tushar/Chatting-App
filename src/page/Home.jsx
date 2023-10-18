import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import { logeduser } from '../slices/userSlice';


const Home = () => {
  const auth = getAuth();
  let nevigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector(state=>state.logedUser.value)
  
  useEffect(()=>{
    if(!data){
      nevigate("/login")
    }
  },[])

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
    <>
     <Button onClick={handlelogout} variant="contained">Sing Out</Button>
    </>
  )
}

export default Home