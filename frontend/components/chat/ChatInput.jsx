import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { ImPause2 } from "react-icons/im";
import MicRecorder from "mic-recorder-to-mp3";
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../lib/slices/chat';

const recorder = new MicRecorder({ bitRate: 128 });

export default function ChatInput(props) {

  const {send,upload} = props;
    //state text
    const [text, setText] = useState("");
   //recording
 const [record, setRecord] = useState(false);

 //
 const dispatch = useDispatch();
 const visit = useSelector((state) => state.visitReducer?.visit);
 const patient = useSelector((state) => state.patientReducer?.patient);

 function recording() {
   //
   if (!record) {
     recorder
       .start()
       .then(() => {
         console.log("alloo");
         setRecord(true);
       })
       .catch((e) => {
         console.error(e);
       });

   } else {
     recorder
       .stop()
       .getMp3()
       .then(([buffer, blob]) => {
         const file = new File(buffer, "me-at-thevoice.mp3", {
           type: blob.type,
           lastModified: Date.now(),

         });
         upload(file);
         setRecord(false);
       })
       .catch((e) => {
         alert("We could not retrieve your message");
         console.log(e);
         setRecord(false);
       });
   }
 }
  //attachment
  const attach = useRef()
  return (
    <form
    className="px-4 absolute left-0 right-0 bottom-4 flex gap-3"
    onSubmit={(e) => {
      e.preventDefault();
      send(text).then(() => setText(""));
    }}
  >
    <Button
      className=""
      color="white"
      variant="contained"
      onClick={recording}
    >
      {!record ? <MicIcon /> : <ImPause2 />}
    </Button>
    <TextField
      value={text}
      onChange={(e) => setText(e.target.value)}
      variant="outlined"
      fullWidth
      className="flex-grow bg-white"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" >
            <input type="file" ref={attach} multiple="multiple" hidden onChange={(e) => {
              // one file 
              // upload(e.target.files[0])
              console.log(e)
              //multiple file
              
              Array.from(e.target.files).map((e)=>upload(e))
              
            }}></input>
            <IconButton onClick={()=>attach.current.click()}>   <AttachFileIcon /></IconButton>
         
          </InputAdornment>
        ),
      }}
    ></TextField>
    <Button className="" color="white" variant="contained" type="submit">
      <SendIcon className="rotate-180" />
    </Button>
  </form>
  )
}
