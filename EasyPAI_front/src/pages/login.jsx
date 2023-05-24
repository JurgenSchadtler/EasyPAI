import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import img from "../assets/vite.svg";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namdsa2xkeHpnbnRqbGRtcGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1MTUzOTMsImV4cCI6MjAwMDA5MTM5M30.12PsI2OKWJVKXOACa4dXV6jU-nAO8QUVDKooqnjQ1Xc";
const USER_URL =
  "https://mgjglkldxzgntjldmpgn.supabase.co/rest/v1/user?select=*";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState([]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setUser(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
        credentials.username === user[0].username &&
        credentials.password === user[0].password
      ) {
        dispatch(authenticateUser());
        localStorage.setItem("isAuth", "true");
        navigate("/dashboard");
      } else {
        toast.error("Username or password incorrect");
      }
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

      <Form onSubmit={(e) => handleSubmit(e)}>
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
      <Toaster position="top-center" richColors />
      <h1 className="login-forgot-pwd-tag">Forgot password?</h1>
    </div>
  );
};

export default Login;
