import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar/NavBar";
import Bottom from "./components/Bottom/Bottom"
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import React, { useState, createContext, useEffect } from "react"
import Manager from "./components/Manager/Manager";
import Register from "./components/Register/Register";
import Employee from "./components/EmployeePage/Employee";

export const Data = createContext();

function App() {
  const [token, setToken] = useState("")
  const [normalToken, setNormalToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [managerLogged, setManagerLogged] = useState(false)
  const [employees, setEmployees] = useState([])
  const tokenFromLocal = localStorage.getItem("token")
  const normalTokenFromLocal = localStorage.getItem("normalToken")


  const providerDate = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    managerLogged,
    setManagerLogged,
    employees,
    setEmployees,
    normalToken,
    setNormalToken
  }
  useEffect(() => {
    setToken(tokenFromLocal)
  }, [token])
  return (
    <Data.Provider value={providerDate} >
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {token && <Route path="/managerPage" element={<Manager />}></Route>}
          {normalToken && <Route path="/employeePage" element={<Employee />}></Route>}
          {token &&<Route path="/register" element={<Register />}></Route>}
        </Routes>
        <Bottom />
      </div>
    </Data.Provider>
  );
}

export default App;
