import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Screens.css"
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentList() {
    const [data, setData] = useState([])
    const navigate = useNavigate()


    const collect = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const fetch = await axios.post("http://localhost:5000/v1/allstudent", { token })
            console.log(fetch.data)
            if (fetch.data.message == "authorised user") {
                setData(fetch.data.data)
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        collect()
    }, [])

    const deletestudent = async (id) => {
        try {
            const del = await axios.delete(`http://localhost:5000/v1/sdelete/${id}`);
            console.log("delted", del)
            if (del.status === 200) {
                collect()
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='m5'>
            <Navbar></Navbar>
            <div className='container mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Class</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.clas}</td>
                                <td><img onClick={() => deletestudent(ele._id)} className='delete' src="/assets/delete.png"></img></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
