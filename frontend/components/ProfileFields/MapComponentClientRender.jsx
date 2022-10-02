import React, {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, center, useMap, useMapEvents,
} from 'react-leaflet';


const CENTER = [35.754650, 51.377395];

function DraggableMarker(props) {
  const { position, setPosition } = props;
  // draggable => true ,you can dragg on map ,at first is false
  const [draggable, setDraggable] = useState(false)
  // current location of marker
  // const [position, setPosition] = useState([35.754650, 51.377395])
  const markerRef = useRef(null)


  //useMemo

  // Without useMemo this function will be regenrated on every render(every state change)
  // const eventHandlers = {
  //   dragend() {
  //     const marker = markerRef.current
  //     if (marker != null) {
  //       setPosition(marker.getLatLng())
  //     }
  //   },
  // }
  // Will only be generated once

  //useMemo(()=>({}),[])
  // const eventHandlers = useMemo(
  //   () => ({
  //     //Dragging events => https://leafletjs.com/reference.html#marker
  //     dragend() {
  //       // marker => getElementById => Marker
  //       const marker = markerRef.current
  //       if (marker != null) {
  //         //update postion
  //         setPosition(marker.getLatLng())
  //       }
  //     },
  //   }),
  //   //only run on first page render 
  //   [],
  // )


  //
  // console.log(position)
  const map = useMapEvents({
    drag(e) {
      const center = e.target.getCenter()
      console.log("Update map", center, position)
      setPosition([center.lat, center.lng])
    },
  })
  //useCallback

  // 1
  // const toggleDraggable = () => {
  //   if (draggable) {
  //     setDraggable(false)
  //   } else {
  //     setDraggable(true)
  //   }
  // }

  // 2
  // useCallback will return a function
  // const toggleDraggable = useCallback(() => {
  //   if (draggable) {
  //     setDraggable(false)
  //   } else {
  //     setDraggable(true)
  //   }
  // }, [draggable])

  // 3
  const toggleDraggable = useCallback(() => {
    // setState((perviousValue) => newValue)
    setDraggable((d) => !d)
  }, [])
  

  return (
    <Marker
      // draggable => true ,you can dragg on map ,at first is false
      draggable={draggable}
      //
      // eventHandlers={eventHandlers}
      //
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}


const MapComponent = (props) => {
  const {
    value, onChange, center = CENTER, active
  } = props;

  const position = useMemo(() => value?.coordinates || center, [value])
  const setPosition = useCallback((val) => {
    if(active) onChange({...(value || {}), coordinates: val})
  }, [value, onChange, active])
  // const [position, setPosition] = useState(value?.coordinates || center)


  console.log("Mapp", position)


  return (
    <div
      className={`m-1 mt-4 flex flex-col justify-center items-center  w-full h-full`}
    >
      {/* <label className={``}>{cmp.label}</label> */}
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        className={`w-full h-full`}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       <DraggableMarker position={position} setPosition={setPosition} />
      </MapContainer>
      
    </div>
  );
};

export default MapComponent;
