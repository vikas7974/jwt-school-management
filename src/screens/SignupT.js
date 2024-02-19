
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from "react-hot-toast"

export default function SignupT() {

  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    education: "TGT"
  })
  const formData = new FormData()
  const setDat = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    setData({
      ...data,
      [name]: value
    })
  }
  const submitForm = async (event) => {
    event.preventDefault();
    formData.append("name", data.name);
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("education", data.education)
    const finalData = Object.fromEntries(formData.entries())
    console.log(finalData)
    const response = await axios.post("http://localhost:5000/v1/tdata", finalData)
    console.log(response.data.message)
    setData({
      name: "",
      email: "",
      password: "",
      education: "TGT"
    })
    if (response.data.status == 409) {
      toast.error(response.data.message)
    }
    navigate("/login")
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mt-5">
        <h1>Teacher Signup</h1>

        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={setDat} value={data.name} type="string" className="form-control" name="name" id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={setDat} value={data.email} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={setDat} value={data.password} type="password" name="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="education" className="form-label">education</label>
            <select onChange={setDat} value={data.education} className="form-control" name="education">
              <option value="PGT">PGT</option>
              <option value="TGT">TGT</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {/* <Link to="/studentsignup"><button>Student's Signup</button></Link>
        <Link to="/login"><button>Login</button></Link> */}
      </div>
    </div>
  )
}
