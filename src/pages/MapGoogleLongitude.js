import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
export default function MapGoogleLongitude() {
  const [pos, setPos] = useState({ lat: -6.2, lng: 106.816666 }); // Jakarta default
  return (
    <APIProvider apiKey={""}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: -6.2, lng: 106.816666 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={(event) => {
          const { lat, lng } = event.detail.latLng;
          console.log("Clicked:", lat, lng);
          setPos({ lat, lng });
        }}
      />
      <Marker position={pos} />
    </APIProvider>
  );
}
