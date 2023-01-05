import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { showAlert } = props;
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    console.log(
      "login is working properly",
      e.target,
      Array.isArray(credential.email) ? credential.email[0] : credential.email,
      Array.isArray(credential.password) ? credential.password[0] : credential.password
    );
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Array.isArray(credential.email) ? credential.email[0] : credential.email,
        password: Array.isArray(credential.password) ? credential.password[0] : credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Login successfuly", "success");
    } else {
      showAlert("Credential does not match", "danger");
    }
  };
  const Onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="container">
      <form onSubmit={login}>
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
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={Onchange} name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
