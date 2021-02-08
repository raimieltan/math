import { Fragment } from 'react';
import React, { useState, useEffect } from 'react'

export default function Profile( {setAuth }) {
  const [fName, setFname] = useState("")
  const [lName, setLname] = useState("")

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }

  const getProfile = async () => {

    try {
      const response = await fetch("http://localhost:8000/profile" , {
        headers: {'Authorization': 'Bearer ' + localStorage.token }
      })
      
      const parseRes = await response.json()
      setFname(parseRes.fname)
      setLname(parseRes.lname)
    } catch (error) {
      console.error(error.message) 
    }


  }

  useEffect(() => {
    getProfile()
  }, [])

  
  return (
    <Fragment>
      <div>
      <div class="header">
                    <div>
                        <a href="/">
                            <div id="logo"></div>
                        </a>

                        <ul>
                            <li class="selected">
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
        <h1>
          First name and Last Name and waay na gid: {fName} {lName}
        </h1>

        <button onClick={(e) => {
          logout(e)
        }}>Logout</button>
      </div> 

    </Fragment>
  )
}