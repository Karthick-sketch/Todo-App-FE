import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Session.css";
import { FormField, FormSubmit } from "./components/FormSection";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/" });

export default function Signup() {
  const redirect = useNavigate();

  async function handleSubmit() {
    try {
      let cred = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      if (cred.email !== "" && cred.password !== "") {
        let response = await api.post("/user", cred).then(({ data }) => data);
        if (response !== undefined && response.status === 200) {
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("user_name", response.data.name);
          redirect("/todos/duetoday");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="User-session">
      <p className="NewUser-title">Welcome new user</p>
      <section className="UsersNew">
        <FormField type="text" title="name" />
        <FormField type="email" title="email" />
        <FormField type="password" title="password" />
        <FormSubmit title="Sign Up" handleSubmit={handleSubmit} />
        <Link to="/signin">Already have an account</Link>
      </section>
    </div>
  );
}
