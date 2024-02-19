import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from './Navbar'

export default function () {

    const navigate = useNavigate()
    const [iam, setIAm] = useState("student")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const formdata = new FormData()

    const submit = async (e) => {
        e.preventDefault()
        formdata.append("iam", iam)
        formdata.append("email", email)
        formdata.append("password", password);
        const finaldata = Object.fromEntries(formdata.entries())
        const loginsend = await axios.post("http://localhost:5000/v1/login", finaldata);
        setEmail("")
        setPassword("")
        console.log(loginsend)

        if (loginsend.data.message == "user autheticated") {
            const usertoken = loginsend.data.token;
            // console.log("sessionStorage token",sessionStorage.getItem("token"))
            // toast.success(loginsend.data.message)
            if (iam == "student") {
                sessionStorage.setItem('token', usertoken)
                navigate("/slist")
                toast.success("Student LoggedIn")
            }
            if (iam == "teacher") {
                sessionStorage.setItem('teachertoken', usertoken)
                navigate("/allt")
                toast.success("Teacher LoggedIn")
            }
        }
        else{
            if (loginsend.data.status==404){
                toast.error("Email Id not found")
            }
            else{
                toast.error("Incorrect Credentials")
            }
        }
    }
    const emailset = (event) => {
        setEmail(event.target.value)
    }
    const emailPassword = (event) => {
        setPassword(event.target.value)
    }
    const setiam = (event) => {
        setIAm(event.target.value)
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                <h1>Login</h1>

                <form onSubmit={submit}>
                    <div>
                        <label htmlFor='set'>Login as :</label>
                        <br></br>
                        <select htmlFor="set" onChange={setiam}>
                            <option value="student">
                                Student
                            </option>
                            <option value="teacher">
                                Teacher
                            </option>
                        </select>
                    </div>
                    <br></br>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={emailset} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={emailPassword} value={password} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    {/* <Link to="/">  <button>Teasches's Signup</button></Link>
                    <Link to="/studentsignup"><button>Student's Signup</button></Link> */}
                </div>
            </div>
        </div>
    )
}
