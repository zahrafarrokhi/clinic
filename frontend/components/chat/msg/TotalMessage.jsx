import React from "react";
import { useSelector } from "react-redux";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";

export default function TotalMessage(props) {
  const token = useSelector((state) => state.chatReducer?.token);
  const { msg } = props;

  return (
    <div
      className={`flex ${
        token.userId === msg.u._id ? "flex-row" : "flex-row-reverse"
      } my-2`}
      key={msg._id}
    >
      {msg.msg && (
        <div
          className={`${
            token.userId === msg.u._id ? "bg-primary bg-opacity-30" : "bg-white"
          } basis-[500px] max-w-[90%] md:max-w-[60%] p-2 rounded-lg text-base text-black`}
        >
          {msg.msg}
        </div>
      )}

      {msg.attachments &&
        msg.attachments?.length > 0 &&
        (msg.attachments[0].audio_url || msg.attachments[0].image_url) && (
          <div
            className={`${
              token.userId === msg.u._id ? "bg-primary bg-opacity-30" : "bg-white"
            } basis-[500px] max-w-[90%] md:max-w-[60%] p-2 rounded-lg text-base text-black`}
          >
            {msg.attachments[0].audio_url && <VoiceMessage msg={msg} />}
            {msg.attachments[0].image_url && <ImageMessage msg={msg} />}
            {/* {(msg.attachments && msg.attachments?.length>0 && msg.attachments[0].image_url) && <ImageMessage msg={msg}/>}
      {(msg.attachments && msg.attachments?.length>0 && msg.attachments[0].type == 'file') && <FileMessage msg={msg}/>} */}
          </div>
        )}

      {/* we cant use msg.attachments[0].type == 'file' because it shows in image and audio  */}
      {msg.attachments &&
        msg.attachments?.length > 0 &&
        !(msg.attachments[0].audio_url || msg.attachments[0].image_url) && (
          <div
            className={`${
              token.userId === msg.u._id ? "bg-transparent" : "bg-white"
            } basis-[500px] max-w-[90%] md:max-w-[60%] p-2 rounded-lg text-base text-black`}
          >
            <FileMessage msg={msg} />
          </div>
        )}
    </div>
  );
}
