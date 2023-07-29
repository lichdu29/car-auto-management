import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import logoUrl from "../../assets/logo.png";
import "./Map.css";
import { Image } from "antd";

const Maps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8",
  });
  if (!isLoaded) return <div>Loading ...</div>;
  return <Map />;
};

const Map = () => {
  const center = useMemo(() => ({ lat: 21.027111, lng: 105.835916 }));
  return (
    <GoogleMap zoom={18} center={center} mapContainerClassName="map-container">
      <div
        style={{
          height: "431px",
          width: "328px",
          backgroundColor: "white",
          position: "absolute",
          zIndex: "999",
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          left: '100px',
          top: '150px',
          borderTop: '5px solid #FFCC00'
        }}
      >
        <Image src={logoUrl} width={150} style={{margin: '0 auto', display: 'flex'}}/>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" , width: '250px', margin: '0 auto'}}>
          <FontAwesomeIcon
            icon={faLocationArrow}
            style={{ color: "#1a69e8" }}
          />
          <p>Toa Nha AutoCar 779, Y Mieu Street, Dong Da, Ha Noi, Viet Nam</p>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "10px" , width: '250px', margin: '0 auto' }}>
          <FontAwesomeIcon icon={faPhone} style={{ color: "#1a69e8" }} />
          <p>0123456789</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" , width: '250px', margin: '0 auto' }}>
          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#1a69e8" }} />
          <p>beststop@gmail.com</p>
        </div>
      </div>
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default Maps;
