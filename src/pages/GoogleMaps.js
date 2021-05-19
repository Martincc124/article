import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "1000px",
  height: "800px",
};
const center = {
  lat: 55.34823,
  lng: 10.27003,
};

const options = {
  zoomControl: true,
};
const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBE7yx9mTeviORzteSm283KqEBiOlAhgSE",
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/markers`);
      const body = await result.json();
      setMarkers(body);
    };
    fetchData();
  }, []);

  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";

  if (!isLoaded) return "Loading maps";

  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map((marker, key) => (
            <Marker
              key={key}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>{selected.title}</h2>
                <p>{selected.text}</p>
                <Link to={`/article/${selected.article}`}>
                  Læs artiklen her
                </Link>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
};

export default Maps;
