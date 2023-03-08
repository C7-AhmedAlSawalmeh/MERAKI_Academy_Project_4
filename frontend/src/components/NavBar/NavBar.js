import React from 'react'
import system from "./system.svg"
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className='navContainer'>
        <img src={system}/>
        <p className='home'>yourSystem</p>
        <button>Login</button>
    </div>
  )
}

export default NavBar