import { alpha, Button, LinearProgress } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import BlobLoader from './BlobLoader';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function FileMessage(props) {
  const {msg} = props;
  const [progress, setProgress] = useState(false);
  const token = useSelector((state) => state.chatReducer?.token);

  // const doProgress = useCallback(
  //   (e) => {
  //     console.log(e)
  //     // setProgress()
  //   },
  //   [],
  // )
  

  const { blob, error, loadBlob, response, base64 } = BlobLoader(msg.attachments[0].title_link,);
  return (
    <div className="flex flex-col">
      <Button color="info" variant='text' className="flex items-center justify-center" onClick={() => {
        setProgress(true)
        loadBlob().then(r => {
          setProgress(false)
          const element = document.createElement('a');
          element.href = URL.createObjectURL(new Blob([r.blob], { type: r.response.headers['content-type'] }));
          element.download = `file-${msg._id}-${msg.file.name}`;
          document.body.appendChild(element);
          element.click();
          element.remove();
        })

        
      }}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      })}
      >
        <ArrowCircleDownIcon className='my-2 mx-2'/> 
        {msg.attachments[0].title}

      </Button>
         {progress && <LinearProgress variant="indeterminate"  />}


    </div>
  )
}
