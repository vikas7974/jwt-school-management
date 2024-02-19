import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("teachertoken");
    navigate("/login")
  }

  const token = sessionStorage.getItem("token") || sessionStorage.getItem("teachertoken")
  useEffect(() => {
  }, [])
  return (
    <div className='mt-3 '>
      {token ? <button className="btn btn-secondary ml-3" onClick={logout}>Logout</button> : (<div><Link to="/studentSignup" className='m-3'><button className="btn btn-secondary">Signup Student</button></Link><Link to="/" className='m-3'><button className="btn btn-secondary">Signup Teacher</button></Link><Link to="/login" className='m-3'><button className="btn btn-success">Login</button></Link></div>)}
    </div>
  )
}
