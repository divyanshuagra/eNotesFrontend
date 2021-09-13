import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {

    const [details, setdetails] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory()


    const onsubmit = async (e) => {
        e.preventDefault()
        const url = "http://localhost:5000/api/auth/createuser"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password })
        });
        const json = await response.json();
        console.log(json)

        //if signup successful
        if (json.success) {
            localStorage.setItem('token', json.authtoken) //saving crdentials in browser's localstorage
            history.push('/')
        }
    }

    const onChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input required type="name" className="form-control" name="name" id="name" value={details.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input required type="email" className="form-control" name="email" id="email" value={details.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input minLength={6} required type="password" className="form-control" name="password" id="password" value={details.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="cpassword" id="cpassword" value={details.cpassword} onChange={onChange} />
                    </div>
                    <button disabled={details.password != details.cpassword} minLength={6} required type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
