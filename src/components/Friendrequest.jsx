import React, { useEffect, useState } from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const Friendrequest = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [requeslist,setRequestlist]=useState([])


  useEffect(()=>{
    
    const userRef = ref(db, 'friendrequest');
    onValue(userRef, (snapshot) => {
    let arr=[]
    snapshot.forEach(item=>{
      if(item.val().whoreceiveid==userinfo.uid){
        arr.push({...item.val(), frid:item.key});
      }
      // console.log(item.val());
      // console.log("loinuser",userinfo);
      // console.log(arr);
      
    })
    setRequestlist(arr);
    });
    },[]);

    let handlereject =(item)=>{
      remove( ref(db, 'friendrequest/'+item.frid))
    };

    let acceptfriend=(item)=>{
        // console.log(item);
      set(push(ref(db, 'friendlist')), {
        ...item
      }).then(()=>{
        remove( ref(db, 'friendrequest/'+item.frid))
      })
    };

  return (
    <>
    <div className="box">
        <h2>Friend Requests</h2>
        {requeslist.map(item=>
        
        <div className='list'>
        <Image src={gimg}/>
        <h3>{item.whosendname}</h3>
        <button onClick={()=>acceptfriend(item)} >Accept</button>
        <p onClick={()=>handlereject(item)} className='rejectbtn'>Reject</p>
        </div>
        
        )}
        
    </div>
    </>
  )
}

export default Friendrequest