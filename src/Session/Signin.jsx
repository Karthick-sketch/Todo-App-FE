import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Session.css";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/" });

export default function Signin() {
  const redirect = useNavigate();
  async function handleSubmit() {
    try {
      let cred = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      if (cred.email !== "" && cred.password !== "") {
        let response = await api
          .post("user/signin", cred)
          .then(({ data }) => data);
        if (response !== undefined && response.status === 200) {
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("user_name", response.data.name);
          redirect("/todos/duetoday");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="User-session">
      <p className="NewUser-title">Sign In</p>
      <section className="UsersNew">
        <div className="Form-section">
          <p className="FormInput-label">Email:</p>
          <input type="email" id="email" className="Form-input" autoFocus />
        </div>
        <div className="Form-section">
          <p className="FormInput-label">Password:</p>
          <input type="password" id="password" className="Form-input" />
        </div>
        <div className="Form-section">
          <button className="Form-submit" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
        <Link to="/signup">Create new account</Link>
      </section>
    </div>
  );
}
