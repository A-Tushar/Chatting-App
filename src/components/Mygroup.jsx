import React,{useState,useEffect} from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Mygroup = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [grouplist,setGrouplist]=useState([]);

  useEffect(()=>{
    
    const userRef = ref(db, 'groups');
    onValue(userRef, (snapshot) => {
    let arr=[]
    snapshot.forEach(item=>{
      if (item.val().admin == userinfo.uid) {
        arr.push(item.val());
    }
          
    })
    console.log(userinfo);
    setGrouplist(arr);

    });
    },[]);



  return (
    <>
   <div className="box">
        <div className="groupheading">
          <h2>My Groups</h2>
        </div>

        {grouplist.map(item=>

        <div className='list'>
        <Image src={gimg}/>
        <h3>{item.groupname}</h3>
        <button >Request List</button>
        <button >Members</button>
        </div>

        )}
    </div>
    </>
  )
}

export default Mygroup