import React ,{useState,useContext} from 'react'
import system from "./system.svg"
import "./NavBar.css"
import { Link ,useNavigate } from 'react-router-dom'
import { Data } from '../../App';
const NavBar = () => {
    const {isLoggedIn,setIsLoggedIn,token,setToken,managerLogged, setManagerLogged, normalToken, setNormalToken} = useContext(Data)
 const navigate = useNavigate()
    const handleClick =(e)=>{
        e.preventDefault()
        setIsLoggedIn(false)
        setToken("")
        setNormalToken("")
        setManagerLogged(false)
        localStorage.setItem("token","")
        localStorage.setItem("normalToken","")
        navigate("/")
    }
    
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link className="navbar-logo" to={"/"}><a href="#" className="navbar-logo">
          System
        </a></Link> 
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            
          {token||normalToken ?<p  className="navbar-link" onClick={handleClick}>LogOut</p>:<Link className="navbar-link" to={"/login"}><p  className="navbar-link"> Login</p></Link>}
          </li>
          <li className="navbar-item">
          {token&&<Link  className="navbar-link" to={"/register"}><p className='navbar-link'>Register</p></Link>}
          </li >
          <li className="navbar-item">
          {token&&<Link  className="navbar-link" to={"/managerPage"}><p className='navbar-link'>Manger Page</p></Link>}
          </li >
        </ul>
         <div className="navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div> 
      </div>
    </nav>
  );
  
}

export default NavBar

// //<div className='navContainer'>
// <Link to={"/"}><img className='logo' src={system}/></Link> 
        
// {token||normalToken ?<p  className="navbar-link" onClick={handleClick}>LogOut</p>:<Link className="navbar-link" to={"/login"}><p  className="navbar-link"> Login</p></Link>}

// {token&&<Link to={"/register"}><p className='registerBtn'>Register</p></Link>}

// </div>
//<p  className="navbar-link" onClick={handleClick}>LogOut</p>