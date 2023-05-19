import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../style/login.css";

import img from "../assets/vite.svg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  return (
    <div className="login-main-div">
      <div className="login-header-div">
        <img src={img} height="50px" />
      </div>
      <h1 className="dashboard-h1">Welcome back, </h1>
      <p className="login-welcome-p">
        We happy to see you here again. Enter your username and password
      </p>

      <Form>
        <Form.Control
          className="login-input"
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={(e) => onChange(e)}
        />
        <Form.Control
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={(e) => onChange(e)}
        />
        <button className="login-button" type="submit">
          Log In
        </button>
      </Form>

      <h1 className="login-forgot-pwd-tag">Forgot password?</h1>
    </div>
  );
};

export default Login;
