import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Session.css"
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8080/" });

export default function Signin() {
    const redirect = useNavigate();
    async function handleSubmit() {
        try {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (email !== '' && password !== '') {
                let data = await api.get("/user/signin/" + email).then(({data}) => data);
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("user_name", data.name);
                redirect("/todos");
            }
        } catch (error) { console.log(error); }
    }

    return (
        <div className="User-session">
            <p className="NewUser-title">Sign In</p>
            <section className="UsersNew">
                <div className="Form-section">
                    <p className="FormInput-label">Email: </p>
                    <input type="email" id="email" className="Form-input" autoFocus/>
                </div>
                <div className="Form-section">
                    <p className="FormInput-label">Password: </p>
                    <input type="password" id="password" className="Form-input"/>
                </div>
                <div className="Form-section">
                    <button className="Form-submit" onClick={handleSubmit}>Sign In</button>
                </div>
                <Link to="/signup">Create new account</Link>
            </section>
        </div>
    );
}
