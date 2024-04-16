/**
 * @file login.jsx
 * @description Login component responsible for rendering the login page of the application. Handles user authentication and form submission.
 * @author jhludwolf
 * @created May 18, 2023
 */

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import img from "../assets/vite.svg";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";

import { authenticateUser } from "../redux/slices/authSlice";
import log from "loglevel";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNueGlhZ2p6dHppYnRseGRjcXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMTQzMDIsImV4cCI6MjAyODc5MDMwMn0.1EcVnTcPW1UoFQLpP4zubKVkpPLMTd5D8n8UtYuNmqI";
const USER_URL =
  "https://cnxiagjztzibtlxdcqsa.supabase.co/rest/v1/user?select=*";

const Register = () => {
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
    log.debug("Welcome to the App");

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setUser(response.data); // Update the user state with the fetched data
      } catch (error) {
        //console.error("Error:", error); // Log the error to the console
        log.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post(
        "https://cnxiagjztzibtlxdcqsa.supabase.co/rest/v1/user",
        {
          username: credentials.username,
          password: credentials.password,
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      toast.success("User Created");
      navigate("/login");
    } catch (error) {
      //console.error("Error:", error); // Log the error to the console
      log.error("Error:", error);
      toast.error("Server Error");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="login-main-div">
      <div className="login-header-div">
        <img src={img} height="50px" />
      </div>
      <h1 className="dashboard-h1">
        You are a few steps of begin your journey,{" "}
      </h1>
      <p className="login-welcome-p">
        We happy to see you here again. Enter your new username and password
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
          Register
        </button>
      </Form>
      <Toaster position="top-center" richColors />
      <button className="login-button" onClick={handleLogin}>
        Back to Login
      </button>
    </div>
  );
};

export default Register;
