import React, { useState, useEffect, Fragment } from 'react';
import './style.css';


export default function Profile({ setAuth }) {
  const [fName, setFname] = useState("")
  const [lName, setLname] = useState("")

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }

  const getProfile = async () => {

    try {
      const response = await fetch("http://localhost:8000/profile", {
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
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
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/main-page">Main</a>
            </li>
            <li>
              <button onClick={(e) => {
                logout(e)
              }}>Logout
                </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="profile-body">
        <div id="bg">
          <div id="avatar"></div>
          <div id="featured">
            <div>
              <h2>{fName} {lName}</h2>
              <h3>Beginner</h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  )
}