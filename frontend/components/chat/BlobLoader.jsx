import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';




// url => which file for loading
export default function BlobLoader(url, progressCallback) {
  const token = useSelector((state) => state.chatReducer?.token);
  // blob for data file
  const [blob, setBlob] = useState(null);
  // base65 for src => binary change to base64
  const [base64, setBase64] = useState('');
  // axios response save on response
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const compiledURL = `${url}`



  const loadBlob = async () => {
    try {
      setError(false);
      const res = await axios.get(compiledURL, {
        responseType: 'arraybuffer',
        headers: {
          'X-Auth-Token': token.authToken,
          'X-User-Id': token.userId,
        },
        onDownloadProgress: (pe) => {
          if (progressCallback)
            progressCallback(pe)
        }
       
      });

      const b = res.data;

      const i = Buffer.from(b, 'binary').toString('base64');

      setBase64(`data:${res.headers['content-type']};base64,${i}`);

      setBlob(b);
      setResponse(res);

      return { blob: b, response: res };
    } catch (e) {
      setError(true);
      return { error: true };
    }
  };

  return {
    blob, error, loadBlob, response, base64
  };
};

