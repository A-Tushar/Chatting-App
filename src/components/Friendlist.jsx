import React, { useState,useEffect } from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const Friendlist = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [friendlist,setFriendlist]=useState([]);

  useEffect(()=>{
    
    const userRef = ref(db, 'friendlist');
    onValue(userRef, (snapshot) => {
    let arr=[]
    snapshot.forEach(item=>{
      if(item.val().whoreceiveid==userinfo.uid || item.val().whosendid== userinfo.uid){
        arr.push({...item.val(),fid:item.key});
      }
      // console.log(item.val());
      // console.log("loinuser",userinfo);
      // console.log(arr);
    })
    setFriendlist(arr);
    });
    },[]);

  let handleblock=(item)=>{
    set(push(ref(db, 'blocklist')), {
      ...item
    }).then(()=>{
      remove( ref(db, 'friendlist/'+item.fid))
    })
  }


  return (
    <>
    <div className="box">
        <h2>Friend List</h2>

      {friendlist.map(item=>

        <div className='list'>
        <Image src={gimg}/>
        <h3>{item.whosendid==userinfo.uid ?
        item.whoreceivename
        :
        item.whosendname
        }</h3>
        <button onClick={()=>handleblock(item)} >Block</button>
        </div>

      )}


    </div>
    </>
  )
}

export default Friendlist