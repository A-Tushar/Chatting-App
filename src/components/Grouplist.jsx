import React,{useState,useEffect} from 'react'
import Image from './Image'
import gimg from '../assets/img.png'
import { getDatabase, ref,onValue, set,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const Grouplist = () => {
  const db = getDatabase();
  let userinfo = useSelector((state)=>state.logedUser.value);

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
  let [groupdata,setGroupdata]=useState({
    name:"",
    tag:"",
    });
    let [grouplist,setGrouplist]=useState([]);
    let [grlist,setGrlist]=useState([]);

  let handlechange =(e)=>{
    setGroupdata({
      ...groupdata,
      [e.target.name]: e.target.value
    })};

  let handlecreate =()=>{
      set(push(ref(db, 'groups')), {
        groupname:groupdata.name,
        grouptag:groupdata.tag,
        admin:userinfo.uid
      });
      setOpen(false);
    };
  
    useEffect(()=>{
    
      const userRef = ref(db, 'groups');
      onValue(userRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        if (!(item.val().admin == userinfo.uid)) {
          arr.push({...item.val(), gid:item.key});
      }
            
      })

      setGrouplist(arr);
  
      });
      },[]);

    useEffect(()=>{
    
      const userRef = ref(db, 'grouprequest');
      onValue(userRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        if (item.val().whosendid == userinfo.uid) {
          arr.push(item.val().groupid);
      }
            
      })

      setGrlist(arr);
      console.log(grlist);
      
  
      });
      },[]);

    let handlejoin =(item)=>{
      set(push(ref(db, 'grouprequest')), {
        whosendid : userinfo.uid,
        whosendname : userinfo.displayName,
        groupid: item.gid,
        groupname:item.groupname,
        groupadmin:item.admin,
      });
    };


  return (
    <>
    <div className="box">
        <div className="groupheading">
          <h2>Groups List</h2>
        <button onClick={handleOpen} >Create a Group</button>
        </div>

        {grouplist.map(item=>

        <div className='list'>
        <Image src={gimg}/>
        <h3>{item.groupname}</h3>

       
        {grlist.includes(item.gid) ?
        
       <p className='rejectbtn'>Pending</p>
        :
       <button onClick={()=>handlejoin(item)}> Join </button>
      }

       
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
        <h4>Create a group with Your Friends !</h4>
      <TextField onChange={handlechange} name='name' id="standard-basic" label="Group Name" variant="standard" /> <br />
      <TextField onChange={handlechange} name='tag' id="standard-basic" label="Group tag" variant="standard" />
      <button onClick={handlecreate} className='modalbutton'>Create</button>
      </Box>
    </Modal>
    </>
  )
}

export default Grouplist