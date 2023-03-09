import React from 'react'
import system from "./system.svg"
import "./NavBar.css"
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navContainer'>
       <Link to={"/"}><img className='logo' src={system}/></Link> 
        
        <Link to={"/login"}><button className='loginBtn'>Login</button></Link>
    </div>
  )
}

export default NavBar