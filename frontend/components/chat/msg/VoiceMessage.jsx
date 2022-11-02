import { alpha, Button, fabClasses, IconButton, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlobLoader from './BlobLoader';
import { ImPause2, ImPlay2 } from "react-icons/im";
import MicIcon from "@mui/icons-material/Mic";
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';


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
  //ref => play btn
  const ref = useRef();
  const [time,setTime]= useState(0)
  const timerRef = useRef(null);
  const startTimer = () => {
    // setInterval
    // const Time = setInterval(()=>{},5000)
    const Time = setInterval(()=>{
      setTime(ref.current?.currentTime)
      if (ref.current?.currentTime === ref.current?.duration) {
        const audio = ref.current
        audio.pause()
        setPlay(false)
        stopTimer()
        // playAudio() // Wrong play value because play is a state
        ref.current.currentTime = 0
      }
    },1000)
    timerRef.current=Time
  }
  const stopTimer = () => {
    if(timerRef.current) clearInterval(timerRef.current)
  }

  
  const [play,setPlay] = useState(false)
  const playAudio = () => {
    const audio = ref.current
    if (play){ audio.pause(),setPlay(false), stopTimer()}
    else {audio.play(),setPlay(true), startTimer()}
  }
  


  const Time = (t) => {
    if (!t) {
      return '00:00';
    }
    const second = Math.floor(t);
    const min = Math.floor(second / 60);
    const hour = Math.floor(min / 60);

    return `${String(min).padStart(
      2,
      '0',
    )}:${String(second % 60).padStart(2, '0')}`;
  };
 
  useEffect(() => {
    if(ref.current) ref.current.load()
    return () => {
      stopTimer();
    
    }
  }, [])
  // mute & connent voice
  const [mute,setMute] = useState(false)
  return (
    <div className="flex items-center  justify-between">
    {/*with controls */}
{/* 
    <audio 
      src={base64} 
      type={msg?.attachments[0].audio_type} 
      className="max-w-full" 
      controls
    >
      <source
            type={msg?.attachments[0].audio_type}
          />

    </audio> */}

    {/*miss controls */}
     <audio 
      src={base64} 
      type={msg?.attachments[0].audio_type} 
      ref={ref}
      
    >
      <source
            type={msg?.attachments[0].audio_type}
          />

    </audio> 
    <div className="text-xs md:text-base">
    {Time(time)}/{Time(ref?.current?.duration)}
    </div>
    {/* {ref.current?.currentTime} */}
    <IconButton className="text-xs md:text-base" onClick={playAudio}>
    {!play ? <ImPlay2 className="text-base md:text-xl" /> : <ImPause2 className="text-base md:text-xl" />}
    </IconButton>
    <Slider
    className="flex-grow mx-2"
  // aria-label="Temperature"
  // defaultValue={30}
  track="inverted"
//  valueLabelFormat={(x) => x}
sx={(theme) => ({
  "& .MuiSlider-track": {
    backgroundColor: alpha(theme.palette.white.main, 0.8)
  },
  "& .MuiSlider-thumb": {
    [theme.breakpoints.down('md')]: {
      width: '10px',
      height: '10px'
    }
  },
  // "& .Mui"
})}

 valueLabelFormat={(x) => Time(ref.current?.duration - x)}
  valueLabelDisplay="auto"
  step={1}
  // marks
  min={0}
  max={ref.current?.duration}
  value={ref.current?.duration - time}
  onChange={(e)=>{
    setTime(ref.current?.duration - e.target.value)
    ref.current.currentTime = ref.current?.duration - e.target.value
  }}

 
/>
<IconButton className="text-base md:text-base" onClick={()=>setMute((m) => {
  if (m) {
    ref.current.volume = 1
  } else {
    ref.current.volume = 0
  }
  return m?false:true
}) }>

{!mute && <VolumeUp className="text-base md:text-xl"  />}
{mute &&<VolumeOff className="text-base md:text-xl" /> }
</IconButton>

    <IconButton className="text-base md:text-base" onClick={download} ><DownloadIcon className="text-base md:text-xl" /></IconButton>
    </div>
  )
}
