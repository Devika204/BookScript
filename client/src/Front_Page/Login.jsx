import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css"; // Import the external styles
import Swal from 'sweetalert2';

function Log() {

  // State to hold user input
  const [user, setUser] = useState({ name: "", email: "" });

  // For page navigation
  const navigate = useNavigate();

  // Handle input field changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));  // Update state
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // Send login data to backend
      const res = await axios.post("http://localhost:8000/api/login", {
        name: user.name,
        email: user.email,
      });
      
      // Navigate to page based on role
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/home");
    } 
    catch (err) 
    {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials!',
        confirmButtonColor: '#d33',
        background: '#1e1e1e',  
        color: '#ffffff'
      });
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: "url('images/bg4.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="login-card">
        <div className="login-right">

          <h2 className="login-title">Welcome Back !</h2>

          <form onSubmit={submitForm}>

            <label>Full Name: </label>
            <input type="text" name="name" placeholder="Enter your name" onChange={inputHandler} required/>

            <label>Email: </label>
            <input type="email" name="email" placeholder="Enter your email" onChange={inputHandler} required/>

            <button type="submit">Login</button>

          </form>
          
          <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>

        </div>
      </div>
    </div>
  );
}

export default Log;
