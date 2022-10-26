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
import { getToken, listMessages, sendVisitMessage } from "../../../lib/slices/chat";

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

//chat(token)
const token = useSelector(state=>state.chatReducer?.token)

const Token = async()=>{
  try {
    await dispatch(getToken(patient.id)).unwrap()
    
  } catch (error) {
    
  }
}
useEffect(()=>{
 Token()
},[patient])
const [open,setOpen] = useState(false)
//state text
const [text,setText]=useState("")
// chat(message)
const sendmsg = async()=>{
  try {
    await dispatch(sendVisitMessage({
      //url from redux
      p_id: patient.id, 
      visit_id: id,
      //cred with rest(back beacuse body)
      text: text, 
    })).unwrap() // {text: ''}
    
    setText("")

    // cred without rest
    // async ({visit_id,p_id, cred}, thunkAPI) => {}
    // await dispatch(sendVisitMessage({
    //   //url from redux
    //   p_id: patient.id, 
    //   visit_id: id,
    //   //cred without rest(back beacuse body)
    //   cred: {
    //     text: '', 
    //   },
    // })).unwrap() // {text: ''}
  } catch (error) {
    
  }
}

// messages
const messages = useSelector(state=>state.chatReducer?.messages?.messages)

const lstMessages = async()=>{
  try {
    await dispatch(listMessages({
       //url from redux
       p_id: patient.id, 
       visit_id: id,
    })).unwrap()
    
  } catch (error) {
    
  }
}
useEffect(()=>{
  if(id && patient?.id) lstMessages()
},[patient, id])
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
  <div className="flex relative flex-grow flex-col-reverse" style={{
    backgroundImage: `url("/chatbackground.png")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  }}>
    <div className="absolute inset-0 flex flex-col-reverse overflow-auto pb-24  px-4">
   {messages?.map((msg)=>
   
   <div className={`flex ${token.userId===msg.u._id ? 'flex-row' : 'flex-row-reverse'} my-2`}>
   <div className={`${token.userId===msg.u._id ? 'bg-accent900' : 'bg-white'} basis-[400px] max-w-[90%] md:max-w-[60%] p-2 rounded-lg text-base text-black`}>{msg.msg} </div>
   </div>
   
   )}
   </div>

  <form className="px-4 absolute left-0 right-0 bottom-4 flex gap-3" onSubmit={(e) => {
    e.preventDefault();
    sendmsg()
  }}> 

   <Button className="" color="white" variant="contained"><MicIcon/></Button>
   <TextField value={text} onChange={(e) => setText(e.target.value)} variant="outlined"  fullWidth className="flex-grow bg-white" InputProps={{
    endAdornment: <InputAdornment position="end"><AttachFileIcon /></InputAdornment>
   }}></TextField>
   <Button className="" color="white" variant="contained" type="submit"><SendIcon className="rotate-180"/></Button>

  </form>

  </div>
  </div>
)
}
Chat.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Chat;