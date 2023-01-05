import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/Notes/noteContext";

const Signup = (props) => {
  const context = useContext(NoteContext);
  const { host } = context;
  const { showAlert } = props;
  const [credential, setCredential] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    console.log(
      "signup is working properly",
      e.target,
      Array.isArray(credential.name) ? credential.name[0] : credential.name,
      Array.isArray(credential.email) ? credential.email[0] : credential.email,
      Array.isArray(credential.password) ? credential.password[0] : credential.password
    );
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Array.isArray(credential.name) ? credential.name[0] : credential.name,
        email: Array.isArray(credential.email) ? credential.email[0] : credential.email,
        password: Array.isArray(credential.password) ? credential.password[0] : credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Account created successfully", "success");
    } else {
      showAlert("Enter valid details", "danger");
    }
  };
  const Onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="container">
      <form onSubmit={signup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" onChange={Onchange} name="name" minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={Onchange} name="email" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={Onchange} name="password" minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
