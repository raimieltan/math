import React, { useState } from "react"
import { toast } from 'react-toastify'
import './style.css';


const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        const body = { email, password }

        try {

            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            )

            const parseRes = await response.json()

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true)
                toast.success("Logged in sucessfully")
                
            } else {

                setAuth(false)
                toast.error(parseRes)
            }


        } catch (error) {
            console.error(error.message)
            window.location.reload(false);
        }
    }
    return (
        <div >
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
            <div className="body">

                <div id="featured">

                    <form onSubmit={onSubmitForm}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => onChange(e)} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} />
                        <br></br>
                        <button id="btn">SIGN IN</button> <br/> <br/>
                        <a id="reg" href="/signup">Register here</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;