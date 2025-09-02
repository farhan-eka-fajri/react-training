import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
export default function MapGoogleLongitude() {
  const [pos, setPos] = useState(); // Jakarta default
  const [valInput, setValInput] = useState("");
  const [places, setPlaces] = useState();
  const apiKey = "";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    valInput
  )}&key=${apiKey}`;

  const debouncedSetValInput = useMemo(
    () => debounce((value) => setValInput(value), 500),
    []
  );

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      setPos({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
  }, []);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const results = data.results;
        if (results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          setPlaces(formattedAddress);
          console.log("Alamat:", formattedAddress);
        } else {
          console.log("Tidak ada hasil alamat");
        }
      } else {
        console.error("Geocoding gagal:", data.status);
      }
    })
    .catch((error) => console.error("Error:", error));

  if (!!valInput)
    return (
      <>
          <div style={{ padding: "10px", textAlign: "center" }}>
            <input
              style={{
                border: "2px solid grey",
                borderRadius: "10px",
                fontSize: "24px",
                color: "grey",
                padding: "5px",
              }}
              // onChange={(e) => setValInput(e.target.value)}
              onChange={(e) => debouncedSetValInput(e.target.value)}
            />
          </div>
          {places}
      </>
    );

  return (
    <>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <input
          style={{
            border: "2px solid grey",
            borderRadius: "10px",
            fontSize: "24px",
            color: "grey",
            padding: "5px",
          }}
          onChange={(e) => setValInput(e.target.value)}
        />
      </div>
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: -6.2, lng: 106.816666 }}
          defaultZoom={12}
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
    </>
  );
}
