import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useRef } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Navigation from "../../components/navigation/Navigation";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, createTicket, createTicketWithFile } from "../../lib/slices/support";
export default function NewTicket() {
  const user = useSelector((state) => state.authReducer?.user);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const ref = useRef();
  const [attachment,setAttachment]=useState([])
  //redux
  // state
  const [state,setState]=useState({
    subject: '',
    text:''
  })
  const dispatch = useDispatch();
  // const submit = async()=>{
  //   try {
      
  //     const resp = await dispatch(createTicket(
  //       {subject:state.subject,
  //        messages:[
  //         {text:state.text}
  //        ]
  //       }
  //     )).unwrap()
  //     const id = resp.data.id

  //     for(let f of attachment){
  //       await dispatch(createMessage(
  //         {file:f,
  //          text:"",
  //          ticket:id

  //         }
  //       )).unwrap()
  //     }
  //   } catch (error) {
      
  //   }
  // }
  
  const submit = async()=>{
    try {
      
      const resp = await dispatch(createTicketWithFile(
        {
          subject:state.subject,
        
          text:state.text,
          files:attachment,
          patient:patient?.id
         
        }
      )).unwrap()

     
    } catch (error) {
      
    }
  }
  
  return (
    <div className="flex flex-col px-8 gap-2 my-4">
      <div className="flex flex-wrap justify-between mt-4 my-2 items-center ">
        <div className="text-sm text-gray font-bold">پشتیبانی</div>
      </div>
      <div className="flex flex-wrap  font-bold text-lg items-center ">
        ارسال درخواست پشتیبانی سایت
      </div>
      <div className="flex flex-wrap italic text-sm text-justify items-center whitespace-normal">
        در این قسمت شما میتوانید مشکلات سایت و نرم افزار را اعلام نمایید. لازم
        به ذکر است موارد این قسمت توسط ادمین بررسی میشود
      </div>
      <div className="flex flex-row gap-4 md:gap-2 my-2 flex-wrap">
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="نام و نام خانوادگی"
          value={user?.type=='patient'? `${patient.first_name} ${patient.last_name}` : user?.type }
          disabled
        ></TextField>
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="پست الکترونیک"
          value={user?.email}
          disabled
        ></TextField>
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="شماره‌ی همراه"
          value={user?.phone_number}
          disabled
        ></TextField>
      </div>

      <div className="flex flex-col gap-4 max-w-full md:max-w-[600px]">
        <TextField size="small" label="موضوع" value={state.subject} onChange={(e)=>{setState({...state,subject: e.target.value })}}></TextField>
        <TextField label="پیام" multiline rows={6} sx={{
          '& .MuiInputBase-root': {
            width: '100% !important',
          }
        }} value={state.text} onChange={(e)=>{setState({...state,text:e.target.value})}}></TextField>
        <div className="flex gap-2 overflow-auto">
          <input type="file" hidden ref={ref} multiple onChange={(e)=>setAttachment([...attachment,...e.target.files])}/>
          {attachment.map((item)=>
          <div className="relative  max-w-full md:w-[400px] md:h-[300px] flex justify-center items-center ">
            <img src={URL.createObjectURL(item)} alt="" className="max-w-[400px] max-h-[400px] rounded-lg"/>
            <Button variant="outlined" onClick={()=>setAttachment(attachment.filter(i=>item !== i))}className="absolute left-1 bottom-1 rounded-full aspect-square p-2 min-w-fit" ><DeleteOutlineIcon className="text-xl "/></Button>

          </div>
          
          )}
        </div>
        <div>
          <Button
            className="flex items-center gap-2"
            color="grayBtn"
            onClick={() => ref.current.click()}

          >
            <DriveFolderUploadIcon />
            پیوست
          </Button>
          </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button size="small" variant="contained" onClick={submit}>
          ارسال
        </Button>
        <Button size="small" variant="outlined">
          انصراف
        </Button>
      </div>
    </div>
  );
}

NewTicket.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
