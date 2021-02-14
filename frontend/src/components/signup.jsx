import React, { useState } from "react"
import { toast } from "react-toastify"
 
import './style.css';



function SignUp({ setAuth }) {

    const [inputs, setInputs ] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    })

    const { fname, lname, email, password} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        const body = { fname, lname, email, password }

        try {

            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            
            if(parseRes.token) {
                setAuth(true)
                localStorage.setItem("token" , parseRes.token)
                

            }
        } catch (error) {
            setAuth(false)
            console.error(error.message)
            window.location.reload(false);
        }
    }

    return (
        <div className="signup">

            <body>
                <div class="page">
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
                    <div class="body">
                        <div id="featured">
                        
                        <form onSubmit={onSubmitForm}>

                            <input type="fname" name="fname" placeholder="First Name" value={fname} onChange={e => onChange(e)}></input>
                            <input type="lname" name="lname" placeholder="Last Name" value={lname} onChange={e => onChange(e)}></input>
                            <input type="email" name="email" placeholder="Email" value={email} onChange={e => onChange(e)}></input>
                            <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)}></input>
                            {/* <h1>Test commit purposes</h1> */} <br/> <br/>
                            <button id = "btn">Submit</button>
                        </form>

                        </div>
                    </div>
                    <div class="footer">
                        <div>
                            <p class="footnote">&#169; Copyright &#169; 2011. Company name. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default SignUp;
