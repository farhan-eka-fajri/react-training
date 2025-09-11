import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { LogoMarker } from "../assets/icon";

function AutocompleteInput({ setValInput }) {
  const placesLib = useMapsLibrary("places"); // ambil library "places"
  const [service, setService] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // bikin instance AutocompleteService setelah placesLib ready
  useEffect(() => {
    if (!placesLib) return;
    setService(new placesLib.AutocompleteService());
  }, [placesLib]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value && service) {
      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setResults(predictions);
        } else {
          setResults([]);
        }
      });
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Cari alamat..."
        className="border p-2 rounded w-96"
      />

      {/* <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
        {JSON.stringify(results, null, 2)}
      </pre> */}
      {results?.map((d, i) => {
        return (
          <div
          key={i}
            style={{
              padding: "10px",
              border: "1px solid black",
              background: "#d3d8e5",
            }}
          >
            <LogoMarker style={{ width: "30px", height: "30px" }} />{" "}
            {d?.description}
            <button
              style={{ color: "blue" }}
              onClick={() => setValInput(d.description)}
            >
              Ambil Koordinat{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function MapGoogleLongitude() {
  const [pos, setPos] = useState({ lat: -6.2, lng: 106.816666 }); // Jakarta default
  const [valInput, setValInput] = useState("");
  const [places, setPlaces] = useState();
  const apiKey = "";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    valInput
  )}&key=${apiKey}`;

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      setPos({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK") {
            const results = data.results;
            if (results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              setPlaces({
                address: formattedAddress,
                kordinat: results[0].geometry.location,
              });
            } else {
              console.log("Tidak ada hasil alamat");
            }
          } else {
            console.error("Geocoding gagal:", data.status);
          }
        })
        .catch((error) => console.error("Error:", error));
    }, 500);
  }, [url]);

  //buat update titik koordinatnya setelah di klik
  useEffect(() => {
    if (!places) return;
    setPos(places?.kordinat);
  }, [places]);

  return (
    <>
      <APIProvider apiKey={apiKey}>
        <h1 className="text-xl font-bold mb-4">Google Places Autocomplete</h1>
        <AutocompleteInput setValInput={setValInput} />
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: -6.2, lng: 106.816666 }}
          center={pos}
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
