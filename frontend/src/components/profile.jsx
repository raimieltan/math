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
          <a href="/main-page">
            <div id="logo"></div>
          </a>

          <ul>
            <li class="selected">
              <a href="/main-page">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
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
      {/* <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="true" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              
            </li>
          </ul>
        </div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}

    </Fragment >
  )
}