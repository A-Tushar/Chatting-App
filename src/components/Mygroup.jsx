import React,{useState,useEffect} from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const Mygroup = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);
  let [grouplist,setGrouplist]=useState([]);
  const [open, setOpen] = useState(false);
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
  let [rqlist,setRqlist]=useState([]);

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

    useEffect(()=>{
    
      const userRef = ref(db, 'grouprequest');
      onValue(userRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        if (item.val().admin == userinfo.uid) {
          arr.push(item.val());
      }
            
      })
      setRqlist(arr);
      console.log(rqlist);
  
      });
      },[]);


  // let handlerqlist =()=>{
  //   setOpen(true);
  // }



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
        <button onClick={handleOpen} >Request List</button>
        <button >Members</button>
        </div>
        )}
    </div>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div className="box">
        <div className="groupheading">
          <h2>Requested to Join</h2>
        </div>
        <div className='list'>
        <Image src={gimg}/>
        <h3>dhdfhh</h3>
        </div>
    </div>
    
      </Box>
    </Modal>
    </>
  )
}

export default Mygroup