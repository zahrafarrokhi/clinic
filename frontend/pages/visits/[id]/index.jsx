import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../../../components/doctors/ProfileModal";
import Navigation from "../../../components/navigation/Navigation";
import { getVisitPatient } from "../../../lib/slices/visits";

import {
  getToken,
  listMessages,
  recieveMessage,
  sendVisitMessage,
  uploadFile,
} from "../../../lib/slices/chat";



import AvatarChat from "../../../components/chat/AvatarChat";
import TotalMessage from "../../../components/chat/msg/TotalMessage";
import ChatInput from "../../../components/chat/ChatInput";
//


const Chat = (props) => {
 
  const dispatch = useDispatch();

  const visit = useSelector((state) => state.visitReducer?.visit);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const router = useRouter();
  const { id } = router.query;
  const getvisit = async () => {
    try {
      await dispatch(
        getVisitPatient({ patient_id: patient.id, pk: id })
      ).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    if (id) getvisit();
  }, [id, patient]);

  //chat(token)
  const token = useSelector((state) => state.chatReducer?.token);

  const Token = async () => {
    try {
      await dispatch(getToken(patient.id)).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    Token();
  }, [patient]);
 

  // chat(message)
  const sendmsg = async (text) => {
    try {
      await dispatch(
        sendVisitMessage({
          //url from redux
          p_id: patient.id,
          visit_id: id,
          //cred with rest(back beacuse body)
          text: text,
        })
      ).unwrap(); // {text: ''}

      // setText("");

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
    } catch (error) {}
  };

  // messages
  const messages = useSelector(
    (state) => state.chatReducer?.messages?.messages
  );

  const lstMessages = async () => {
    try {
      await dispatch(
        listMessages({
          //url from redux
          p_id: patient.id,
          visit_id: id,
        })
      ).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    if (id && patient?.id) lstMessages();
  }, [patient, id]);



  //socket
  const socket = useRef();
  const startSocket = () => {
    console.log("TEST");
    const sock = new WebSocket(process.env.NEXT_PUBLIC_ROCKETCHAT_WS);
    socket.current = sock;

    const processSocketMessage = (e) => {
      // console.log("New message", e);
      const msg = JSON.parse(e.data);
      // console.log(msg);
      if (msg.msg === "ping") {
        sock.send(
          JSON.stringify({
            msg: "pong",
          })
        );
      }
      if (msg.msg === "changed" && msg.collection === "stream-room-messages") {
        dispatch(recieveMessage(msg.fields.args));
      }
    };

    sock.addEventListener("open", (e) => {
      console.log("Connected");
      sock.send(
        JSON.stringify({
          msg: "connect",
          version: "1",
          support: ["1"],
        })
      );
      sock.send(
        JSON.stringify({
          msg: "method",
          method: "login",
          id: "42",
          params: [{ resume: token?.authToken }],
        })
      );
      subscribeToRoom();
    });

    sock.addEventListener("message", processSocketMessage);
  };

  const stopSocket = () => {
    if (socket.current.readyState === WebSocket.OPEN) socket.current.close();
    socket.current = null;
  };
  const subscribeToRoom = () => {
    const randid = Math.random().toString(16).substr(2, 8);
    if (socket.current.readyState === WebSocket.OPEN) {
      console.log(visit?.room_id);
      socket.current.send(
        JSON.stringify({
          msg: "sub",
          id: `${visit?.room_id}-${token?.userId}`,
          name: "stream-room-messages",
          params: [visit?.room_id, false],
        })
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && socket.current) subscribeToRoom();
  }, [visit, visit?.room_id]);

  useEffect(() => {
    if (typeof window !== "undefined") startSocket();

    return () => {
      if (socket.current) stopSocket();
    };
  }, [token]);
  
  return (
    <div className="flex flex-col flex-grow">
      {/* profileChat */}
     <AvatarChat />
      <div
        className="flex relative flex-grow flex-col-reverse"
        style={{
          backgroundImage: `url("/chatbackground.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 flex flex-col-reverse overflow-auto pb-24  px-4">
          {messages?.map((msg) => (
            // msg(props) = msg(field of map)
           <TotalMessage msg={msg}/>
          ))}
        </div>

        <ChatInput send={sendmsg} />
      </div>
    </div>
  );
};
Chat.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Chat;
