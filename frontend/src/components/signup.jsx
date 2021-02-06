import React, { useState } from "react"
import { toast } from "react-toastify"
 
import './style.css';



function SignUp() {

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
                localStorage.setItem("token" , parseRes.token)
                

            }
        } catch (error) {
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
                            <a href="homepage.js" id="logo"><img src="./img/logo.png"
                                alt="logo"></img></a>
                            <ul>
                                <li class="selected">
                                    <a href="/homepage">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/services">Services</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="body">
                        <div id="featured">
                        
                        <form onSubmit={onSubmitForm}>

                            <input type="fname" name="fname" placeholder="First Name" value={fname} onChange={e => onChange(e)}></input>
                            <input type="lname" name="lname" placeholder="Last Name" value={lname} onChange={e => onChange(e)}></input>
                            <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)}></input>
                            <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}></input>
                            <br></br>
                            <button>Submit</button>
                        </form>

                            {/* <a id="btn" href="wall.js">SIGN IN</a>
                            <a id="reg" href="signup.js">Register here</a> */}

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
