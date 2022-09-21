import React, {
  useState, useRef, useEffect, useMemo,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, center, useMap, useMapEvents,
} from 'react-leaflet';


const CENTER = [35.754650, 51.377395];

const DraggableMarker = (props) => {
  const {
    onChange, value, center, position, setPosition, draggable, toggleDraggable, zoom, setZoom,
  } = props;
  const marker = useRef();

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          setPosition([position.coords.latitude, position.coords.longitude])
        });
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    getLocation();
  }, [])

  const map = useMapEvents({
    drag: (e) => {
      if (draggable) {
        setPosition(e.target.getCenter());
      }
    },
    // dragend: (e) => {
    //   if (draggable) {
    //     setPosition(e.target.getCenter());
    //   }
    // },
  });

  const eventHandlers = useMemo(
    () => ({
      click() {
        const m = marker.current;

        toggleDraggable();
        if (m != null) {
        }
      },
    }),
    [],
  );

  return (
    <Marker eventHandlers={eventHandlers} position={position ?? center ?? CENTER} ref={marker} />
  );
};

const MapComponent = (props) => {
  const {
    value, onChange, cmp, className, center = CENTER, classNameMap, classNameBtn, editableState,
  } = props;

  const [position, setPosition] = useState(value?.coordinates ?? center);
  const [draggable, setDraggable] = useState(editableState);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const updatePosition = (pos) => {
    // onChange({ ...value, coordinates: pos });
    setPosition(pos);
  };

  const toggleDraggable = () => {
    if (draggable) {
      onChange({ ...value, coordinates: position });
      // setDraggable(!draggable);
    } else {
      // setDraggable(true);
    }
  };

  return (
    <div
      className={`m-1 mt-4 flex flex-col justify-center items-center  w-full h-full`}
    >
      {/* <label className={``}>{cmp.label}</label> */}
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className={`w-full h-full`}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          {...props}
          position={position}
          setPosition={updatePosition}
          draggable={draggable}
          toggleDraggable={toggleDraggable}
          setZoom={setZoom}
        />
      </MapContainer>
      { editableState && (
      <button
        className={`m-1 mt-4 p-1 ${
				  draggable ? 'btn btn-outline-secondary' : 'btn btn-secondary'
        }  ${classNameBtn}`}
        onClick={toggleDraggable}
      >
        {draggable ? 'انتخاب' : 'تغییر آدرس'}

      </button>
      )}
    </div>
  );
};

export default MapComponent;
