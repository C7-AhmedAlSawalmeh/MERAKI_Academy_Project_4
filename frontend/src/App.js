import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar/NavBar";
import Bottom from "./components/Bottom/Bottom"
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import React , {useState,createContext ,useEffect } from "react"

export const Data = createContext();

function App() {
const [token, setToken] = useState("")

const providerDate = {
  token
}

  return (
    <Data.Provider >
    <div className="App">
      <NavBar/>
      
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
        <Bottom/>
    </div>
    </Data.Provider>
  );
}

export default App;
