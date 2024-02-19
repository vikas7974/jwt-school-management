import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from "react-hot-toast"
import Navbar from './Navbar'

export default function SignupS() {

    const navigate = useNavigate()
    const formdata = new FormData();
    const [email, setEmail] = useState("")
    const [sname, setSName] = useState("")
    const [password, setPassword] = useState("")
    const [classvalue, setClass] = useState(1)

    const poststudentdata = (event) => {
        try {
            event.preventDefault()
            formdata.append("email", email)
            formdata.append("password", password)
            formdata.append("clas", classvalue)
            formdata.append("name", sname)
            console.log(formdata.get("password"))
            console.log(Object.fromEntries(formdata.entries()));
            const StudentSave = axios.post("http://localhost:5000/v1/student", Object.fromEntries(formdata.entries()));
            setEmail("")
            setPassword("")
            setClass("")
            setSName("")
            StudentSave.then((res) => {
                console.log(res)
                if (res.data.message) {
                    toast.error(res.data.message)
                }
                navigate("/login")
            })
        }
        catch (err) { console.log(err) }
    }

    const handleemail = (event) => {
        setEmail(event.target.value)

    }
    const handlepassword = (event) => {
        setPassword(event.target.value)
    }
    const handleClass = (event) => {
        if (1 <= event.target.value && event.target.value < 13) {
            setClass(event.target.value)
        }
    }
    const handleSName = (event) => {
        setSName(event.target.value)
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container mt-5'>
                <h1>Student Signup</h1>
                <form onSubmit={poststudentdata}>
                    <div className="mb-3">
                        <label htmlFor="studentNamme" className="form-label">Student name</label>
                        <input type="string" value={sname} onChange={handleSName} className="form-control" id="studentName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={handleemail} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={handlepassword} value={password} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="class" className="form-label">Class</label>
                        <input type="number" onChange={handleClass} value={classvalue} className="form-control" id="class" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </div>
    )
}
