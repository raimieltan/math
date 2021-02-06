import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import './style.css';


const Login = () => {

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


                toast.success("Logged in sucessfully")
            } else {

                toast.error(parseRes)
            }


        } catch (error) {
            console.error(error.message)
            window.location.reload(false);
        }
    }
    return (
        <div >

            <div className="body">

                <div id="featured">


                    <form onSubmit={onSubmitForm}>
                        <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                        <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
                        <br></br>
                        <button id="btn">SIGN IN</button>

                    </form>

                </div>

            </div>





        </div>
    )
}

export default Login;