import React, { useEffect, useState } from 'react'
import Image from './Image'
import { getDatabase, ref,onValue, set,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [requestlist,setRequestlist]=useState([]);
  let [users,SetUsers]=useState([]);
  let [friendlist,setFriendlist]=useState([]);
  let [blocklist,setBlocklist]=useState([]);

  useEffect(()=>{

  const userRef = ref(db, 'users');
  onValue(userRef, (snapshot) => {
  let arr=[]
  snapshot.forEach(item=>{
    if(userinfo.uid != item.key){
      arr.push({...item.val(), userid:item.key});
    }
    
  })
  SetUsers(arr);
  });
  },[]);

  let handlefriendrequest =(item)=>{

    set(push(ref(db, 'friendrequest')), {
      whosendid : userinfo.uid,
      whosendname : userinfo.displayName,
      whoreceiveid: item.userid,
      whoreceivename:item.username
    });
  };

  useEffect(()=>{
    
    const userRef = ref(db, 'friendrequest');
    onValue(userRef, (snapshot) => {
    let arr=[]
    snapshot.forEach(item=>{
      arr.push(item.val().whoreceiveid+item.val().whosendid);      
    })

    setRequestlist(arr);

    });
    },[]);

    useEffect(()=>{
    
      const userRef = ref(db, 'friendlist');
      onValue(userRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        arr.push(item.val().whoreceiveid+item.val().whosendid);      
      })
  
      setFriendlist(arr);
  
      });
      },[]);

      useEffect(()=>{
    
        const userRef = ref(db, 'blocklist');
        onValue(userRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          arr.push(item.val().whoreceiveid+item.val().whosendid);      
        })
    
        setBlocklist(arr);
    
        });
        },[]);
    // let handlecancle=(item)=>{
    //   remove( ref(db, 'friendrequest/'+item.frid))
    // };

  return (
    <>
    <div className="box">
        <h2>User List</h2>
        {users.map(item=>
        <div className='list'>
        <Image className={"boximg"} src={item.profile_picture}/>
        <h3>{item.username}</h3>
        {requestlist.includes(item.userid+userinfo.uid)||requestlist.includes(userinfo.uid+item.userid)?
      <>
      <p className='rejectbtn'>Pending</p>
      {/* <button onClick={()=>handlecancle(item)} color='secondary'>Cancle</button> */}
      </> 
      :
        blocklist.includes(item.userid+userinfo.uid)||blocklist.includes(userinfo.uid+item.userid)?   
        <p className='rejectbtn'>Blocked</p>
        :
         friendlist.includes(item.userid+userinfo.uid)||friendlist.includes(userinfo.uid+item.userid)?   
        <p className='rejectbtn'>Friend</p>
        :
      <button onClick={()=>handlefriendrequest(item)}>Add Friend</button>
      }
        
        </div>

        )}
        
    </div>
    </>
  )
}

export default Userlist