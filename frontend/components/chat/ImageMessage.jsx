import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import BlobLoader from './BlobLoader';

export default function ImageMessage(props) {
  const {msg} = props;
  const token = useSelector((state) => state.chatReducer?.token);

  const { blob, error, loadBlob, response, base64 } = BlobLoader(msg.attachments[0].title_link);
  useEffect(()=>{
    loadBlob()
  },[token])
  return (
    <img src={base64} className="max-w-full "/>
  )
}
