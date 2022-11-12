import { Button, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TICKET_STATUS_COLOR, TICKET_STATUS_TEXT } from '..';
import ChatInput from '../../../components/chat/ChatInput';
import Navigation from '../../../components/navigation/Navigation';
import { closeTicket, createMessage, getTicket } from '../../../lib/slices/support';
import { convertStrToJalali } from '../../../lib/utils';

// http://localhost:8000/test.mp3
const isVoice = (fileName) => {
  let sections = fileName.split('.');
  return sections[sections.length - 1] === 'mp3'
}

export default function Ticket() {
  const ticket = useSelector((state) => state.ticketReducer?.ticket);
  const user = useSelector((state) => state.authReducer?.user);
  const dispatch = useDispatch(); 
  const router = useRouter();
  const { id } = router.query;
  const loadTicket = async () => {
    try {
      await dispatch(
        getTicket(id)
      ).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    if (id) loadTicket();
  }, [id]);
 

  const submit = async({file, text})=>{
    try {
        await dispatch(createMessage(
          {file,
           text,
           ticket:id

          }
        )).unwrap()
    } catch (error) {
      
    }
  }

  const upload = (file) => submit({file})
  const sendmsg = (text) => submit({text})

  const close = async () => {
    try {
      await dispatch(closeTicket(id)).unwrap()
    } catch(e) {

    }
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row justify-between shadow-lg p-4">
    <div className="flex flex-col items-center font-bold gap-3">
      <div className="flex font-bold text-sm gap-3">
      <div >شماره تیکت :{ticket?.id} </div>
      <div>{convertStrToJalali(ticket?.created_at)}</div>  
      </div>
      
      <div className="flex font-bold text-sm">
        {ticket?.subject}
       { user?.type === 'support'&& <Button className="py-0 text-sm" onClick={close}>
          بستن تیکت
      </Button>}
      </div>
          
    
    </div>
    <Chip
      variant="status"
      label={TICKET_STATUS_TEXT[ticket?.status]}
      color={TICKET_STATUS_COLOR[ticket?.status]}
    ></Chip>
  </div>
      <div
        className="flex relative flex-grow flex-col-reverse"
        style={{
          backgroundImage: `url("/chatbackground.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
         <div className="absolute inset-0 flex flex-col overflow-auto pb-24  px-4">
          {ticket?.messages?.map((msg) => (
           <div
           className={`flex ${
             user?.type === 'support' ^ ticket.user === msg.user ? "flex-row" : "flex-row-reverse"
           } my-2`}
           key={msg._id}
         >
           <div
             className={`${
              user?.type === 'support' ^ ticket.user === msg.user ? "bg-accent900" : "bg-white"
             } basis-[400px] max-w-[90%] md:max-w-[60%] p-2 rounded-lg text-base text-black`}
           >
             {msg.text}{" "}
             {(msg.file && !isVoice(msg.file)) &&  <img src={msg.file} className="max-w-full "/>}
             {(msg.file && isVoice(msg.file)) &&  <audio src={msg.file} controls className="max-w-full "/>}

           </div>
         </div>
          ))}
        </div>

       {ticket.status != 'closed'&& <ChatInput send={sendmsg} upload={upload}/>}
      </div>
    </div>
  );
}

Ticket.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
