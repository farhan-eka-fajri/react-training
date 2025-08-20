import { Route, Routes as OriginalRoutes } from "react-router-dom";
import App from "./App";

function Routes() {
  return (
    <OriginalRoutes>
        <Route path="/" element={<App />} />
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
