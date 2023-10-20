import React, { useEffect, useState } from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value)
  let [users,SetUsers]=useState([]);

  useEffect(()=>{

  const userRef = ref(db, 'users');
  onValue(userRef, (snapshot) => {
  let arr=[]
  snapshot.forEach(item=>{
    if(userinfo.uid != item.key){
      arr.push(item.val());
    }
    
  })
  SetUsers(arr);
  });
  },[])

  return (
    <>
    <div className="box">
        <h2>User List</h2>
        {users.map(item=>
        <div className='list'>
        <Image className={"boximg"} src={item.profile_picture}/>
        <h3>{item.username}</h3>
        <button>Add Friend</button>
        </div>

        )}
        
    </div>
    </>
  )
}

export default Userlist