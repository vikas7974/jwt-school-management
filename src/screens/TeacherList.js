import React, { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


export default function TeacherList() {
  const [tData, setTData] = useState([]);
  const navigate = useNavigate()

  const fetch = async () => {
    const token = sessionStorage.getItem('teachertoken')
    console.log("teachertoken", token)
    const data = await axios.post("http://localhost:5000/v1/getteachers", { token })
    console.log("data teacher:", data.data)
    if (data.data.message == "authorised user") {
      setTData(data.data.data)
    }
    else {
      navigate("/login")
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  const deletestudent = async (id) => {
    const deleterequest = await axios.delete(`http://localhost:5000/v1/tdelete/${id}`)
    console.log(deleterequest)
    fetch()
  }
  return (
    <div className=' m5'>
      <Navbar></Navbar>
      <div className='container mt-5'>
        <table className='table'>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>PGT/TGT</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tData.map((ele, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.education}</td>
                <td><img onClick={() => deletestudent(ele._id)} className='delete' src="/assets/delete.png"></img></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}
