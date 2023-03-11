import React ,{useState,useContext} from 'react'
import system from "./system.svg"
import "./NavBar.css"
import { Link ,useNavigate } from 'react-router-dom'
import { Data } from '../../App';
const NavBar = () => {
    const {isLoggedIn,setIsLoggedIn,token,setToken,managerLogged, setManagerLogged } = useContext(Data)
 const navigate = useNavigate()
    const handleClick =(e)=>{
        e.preventDefault()
        setIsLoggedIn(false)
        setToken("")
        setManagerLogged(false)
        localStorage.setItem("token","")
        navigate("/")
    }
    
  return (
    <div className='navContainer'>
       <Link to={"/"}><img className='logo' src={system}/></Link> 
        
        {token ?<button className='logOutBtn' onClick={handleClick}>Logout</button>:<Link to={"/login"}><button className='loginBtn'>Login</button></Link>}
        {managerLogged&&<Link to={"/register"}><button className='registerBtn'>Register</button></Link>}
        
    </div>
  )
}

export default NavBar