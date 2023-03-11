import axios from 'axios'
import React, { useState,useContext } from 'react'
import {Data} from "../../App"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [date, setDate] = useState("")
    const { token,setToken } = useContext(Data)
    const [answer, setAnswer] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee = {
            name,
            email,
            password,
            phoneNumber,
            date,
            role: "64057401c939d064928f0b39"
        }
        
        try {
            console.log(token)
            const response = await axios.post("http://localhost:5000/employee/register",employee,{
                headers: {
                  Authorization: `Bearer ${token}`  
                }
              })
              setAnswer(response.data.message)
              console.log(response)
        } catch (err) {
            
            setAnswer(err)

        }
    }
    return (
        <div>
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign Up</h3>

                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                onChange={(e) => {
                                    setName(e.target.value)

                                }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
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
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control mt-1"
                                placeholder="Phone Number"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Date of entry</label>
                            <input
                                type="date"
                                className="form-control mt-1"
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}

                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button> 
                        </div>
                        {answer&&<div>
                                <p>{answer}</p>
                            </div>}
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register