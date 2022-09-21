import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import MapComponentNoSSR from './MapComponentNoSSR';

const MapComponent = (props) => {
  const {
    value, onChange, cmp, className,
  } = props;
  const MapComponentClientRender = dynamic(() => import('./MapComponentClientRender'), { ssr: false });

  return (
    <MapComponentClientRender {...props} />
  );
};

export default MapComponent;
