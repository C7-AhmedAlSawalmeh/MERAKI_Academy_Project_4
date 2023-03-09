import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Data } from '../../App';
import axios from "axios"

import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const { isLoggedIn,setIsLoggedIn,token,setToken } = useContext(Data)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee ={
            email,
            password
        }
        try{
            const response = await axios.post("http://localhost:5000/employee/login",employee)
            localStorage.setItem("token",response.data.token)
            setToken(response.data.token)
            setIsLoggedIn(true)
            setAnswer(response.data.message)
            if (response.data.role.permissions[0]== "DoEveryThing"){
                navigate("/managerPage")
            }
            if(response.data.role.permissions[0]== "JustSee"){
                
            }
            
              
        }catch(err){
            setAnswer(err)
            console.log(err)
            
        }

    }
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                    {answer&&<p>{answer}</p>}
                </div>
            </form>
        </div>
    )
}

export default Login