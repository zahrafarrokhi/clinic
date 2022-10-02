import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import MapComponentClientRender from './MapComponentClientRender';

const MapComponent = (props) => {  
  //props => value,onChange => Address.jsx
  const MapComponentClientRender = useMemo(() => dynamic(() => import('./MapComponentClientRender'), { ssr: false }), [window?.innerWidth, window?.innerHeight]);

  return (
    <MapComponentClientRender {...props} />
  );
 
};


export default MapComponent;
