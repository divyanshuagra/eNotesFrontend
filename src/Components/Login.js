import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useHistory()

    const onsubmit = async (e) => {
        e.preventDefault()
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)

        //if login successful
        if (json.success) {
            localStorage.setItem('token', json.authtoken) //saving crdentials in browser's localstorage
            history.push('/')
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <form onSubmit={onsubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
