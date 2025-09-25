import { Route, Routes as OriginalRoutes } from "react-router-dom";
import App from "./App";
import MapGoogleLongitude from "./pages/MapGoogleLongitude";
import PageLogging from "./pages/PageLogging";

function Routes() {
  return (
    <OriginalRoutes>
      <Route path="/" element={<App />} />
      <Route path="/map-google-longitude" element={<MapGoogleLongitude />} />
      <Route path="/page-logging" element={<PageLogging />} />
    </OriginalRoutes>
  );
}
export default Routes;
