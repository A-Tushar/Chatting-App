import React, { useState,useEffect } from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Blocklist = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [blocklist,setBlocklist]=useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(()=>{
    
    const userRef = ref(db, 'blocklist');
    onValue(userRef, (snapshot) => {
    let arr=[]
    snapshot.forEach(item=>{
      if(item.val().whoreceiveid==userinfo.uid || item.val().whosendid== userinfo.uid){
        arr.push({...item.val(),bid:item.key});
      }
    })
    setBlocklist(arr);
    });
    },[]);

  let handleunblock=(item)=>{
    remove( ref(db, 'blocklist/'+item.bid))
  };
  
  let handlefriendback=(item)=>{
    set(push(ref(db, 'friendlist')), {
      ...item
    }).then(()=>{
      remove( ref(db, 'blocklist/'+item.bid))
    })
  };

  return (
    <>
    <div className="box">
        <h2>Blocked Users</h2>
        {blocklist.map(item=>

        <div className='list'>
        <Image src={gimg}/>
        <h3>{item.whosendid==userinfo.uid ?
        item.whoreceivename
        :
        item.whosendname
        }</h3>
        <button onClick={()=>handleOpen()} >Unblock</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you want this person back on your friend list?
          </Typography>
          <p onClick={()=>handleunblock(item)} className='rejectbtn'> No </p>
          <p onClick={()=>handlefriendback(item)} className='rejectbtn'>Friend</p>
        </Box>
        </Modal>
        </div>

          )}
        
    </div>
    </>
  )
}

export default Blocklist