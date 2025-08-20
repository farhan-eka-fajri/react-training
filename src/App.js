// import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { LogoReact } from "./assets/icon";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <LogoReact style={{animation: 'spin 5s linear infinite', width:'150px'}} />
        <button
          onClick={() => navigate("/longitude")}
          style={{
            fontSize: "x-large",
            borderRadius: "15px",
            padding: 20,
            cursor: "pointer",
          }}
        >
          CLICK TO LONGITUDE
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
