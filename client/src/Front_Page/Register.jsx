import React , { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './register.css'; 

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
    
  // To redirect user to another pag
  const navigate = useNavigate();

  // Function to handle input changes for all fields
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
    
  const submitForm = async (e) => {
    e.preventDefault();
     
    // Create a form data object and append all input values
    const formData = new FormData(); // .append("key", value) adds each field to the FormData object.
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    
    try {
      await axios.post("http://localhost:8000/api/userreg", formData, {
        headers: { "Content-Type": "application/json" } // The Content-Type: multipart/form-data header 
        // ensures the request properly transmits the file and text data.
      });
      navigate("/");
      console.log("Registered successfully");
    } 
    catch (error) 
    {
      console.error("Axios Error:", error);
    }
  };

  return (
    <div className="register-wrapper" style={{ backgroundImage: "url('images/bg6.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="register-card">

        <div className="register-form">
          
          <h2 className="register-title">Create Account</h2>

          <form onSubmit={submitForm}>
            <label>Name: </label>
            <input type="text" name="name" placeholder="Enter your name" onChange={inputHandler} required />
            <label>Email: </label>
            <input type="email" name="email" placeholder="Enter your email" onChange={inputHandler} required />
            <label>Mobile: </label>
            <input type="text" name="phone" placeholder="Enter your phone" onChange={inputHandler} required />
            <button type="submit">Register</button>
          </form>

          <p className="register-link">
            Already have an account? <Link to="/">SignUp</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register;