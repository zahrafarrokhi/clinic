import { Avatar, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../../../components/doctors/ProfileModal";
import Navigation from "../../../components/navigation/Navigation";
import { getVisitPatient } from "../../../lib/slices/visits";
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const Chat =(props)=>{
  const dispatch = useDispatch()
 
  const visit = useSelector((state) => state.visitReducer?.visit);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const router = useRouter()
  const {id} = router.query;
  const getvisit = async()=>{
    try {
      await dispatch(getVisitPatient({patient_id:patient.id, pk:id})).unwrap()
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    if(id) getvisit()
  },[id, patient])
const [open,setOpen] = useState(false)

return(
  <div className="flex flex-col flex-grow">
  <div className="flex flex-row justify-between shadow-lg p-4">
    <div className="flex items-center font-bold gap-3">
     <Avatar src={visit?.doctor?.image}>

     </Avatar>
     <div className="font-bold text-sm">{visit?.doctor?.first_name}{' '}{visit?.doctor?.last_name}</div> \
     <div className="font-bold text-sm">{visit?.doctor?.department?.faname}</div>
    </div>
    <Button onClick={()=>setOpen(true)}>مشاهده پروفایل دکتر</Button>
    <ProfileModal  open={open} setOpen={setOpen}  data={visit?.doctor} />
  </div>
  <div className="flex relative flex-grow" style={{
    backgroundImage: `url("/chatbackground.png")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  }}>
    
  

  <div className="px-4 absolute left-0 right-0 bottom-4 flex gap-3" > 

   <Button className="" color="white" variant="contained"><MicIcon/></Button>
   <TextField variant="outlined"  fullWidth className="flex-grow bg-white" InputProps={{
    endAdornment: <InputAdornment position="end"><AttachFileIcon /></InputAdornment>
   }}></TextField>
   <Button className="" color="white" variant="contained"><SendIcon className="rotate-180"/></Button>

  </div>

  </div>
  </div>
)
}
Chat.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Chat;