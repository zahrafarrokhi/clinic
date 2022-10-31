import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import BlobLoader from './BlobLoader';

export default function VoiceMessage(props) {
  const {msg} = props;
  const token = useSelector((state) => state.chatReducer?.token);

  const { blob, error, loadBlob, response, base64 } = BlobLoader(msg.attachments[0].audio_url);
  useEffect(()=>{
    loadBlob()
  },[token])

  const download = ()=> {
    const element = document.createElement('a');
    element.href = URL.createObjectURL(new Blob([blob], { type: response.headers['content-type'] }));
    element.download = `file-${msg._id}-${msg.file.name}`;
    document.body.appendChild(element);
    element.click();
    element.remove();
    
        }
  return (
    <div>
    <audio controls src={base64} type={msg?.attachments[0].audio_type} className="max-w-full">
      <source
            type={msg?.attachments[0].audio_type}
          />

    </audio>
    <Button onClick={download}>DL</Button>
    </div>
  )
}
