import { Route, Routes as OriginalRoutes } from "react-router-dom";
import App from "./App";
import MapGoogleLongitude from "./pages/MapGoogleLongitude";

function Routes() {
  return (
    <OriginalRoutes>
      <Route path="/" element={<App />} />
      <Route path="/map-google-longitude" element={<MapGoogleLongitude />} />
      <Route
        path="/longitude"
        element={
          <>
            <h1>kaowdkoawkdoakwodkaowdkoawkdoakwodkaowdko</h1>
          </>
        }
      />
    </OriginalRoutes>
  );
}
export default Routes;
