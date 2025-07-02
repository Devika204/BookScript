import React, { useState } from "react";
import "./Adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Adduser = () => {
  // State to store user input
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    image: null, // Store file object
  });

  // For redirecting to home page after submit
  const navigate = useNavigate();

  // **Handle text input changes**
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));  // Update name, email or address
  };

  // When user selects an image
  const imageHandler = (e) => {
    const file = e.target.files[0]; // Get the selected file (first file if multiple are selected)
    setUser((prevUser) => ({ ...prevUser, image: file }));  // Save file to state
  };

  // When form is submitted
  const submitForm = async (e) => {
    // Prevent page reload
    e.preventDefault();
    
    // Create form data to send text and image together
    const formData = new FormData(); // .append("key", value) adds each field to the FormData object.
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("image", user.image);  // Ensure file is sent correctly

    try {

      // POST request to backend
      await axios.post("http://localhost:8000/api/user", formData, {
        headers: { "Content-Type": "multipart/form-data" } // The Content-Type: multipart/form-data header 
        // ensures the request properly transmits the file and text data.
      });

      // If successful, go to home page
      navigate("/");
      console.log("User added successfully");
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'User added successfully!',
        confirmButtonColor: '#3085d6',
        background: '#1e1e1e',  
        color: '#ffffff'
      });
    } 
    catch (error) 
    {
        console.error("Axios Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding!',
        background: '#1e1e1e',  
        color: '#ffffff'
        });
    }
  };
  
  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-primary">
        Back
      </Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label>Name:</label>
          <input type="text" name="name" autoComplete="off" onChange={inputHandler} placeholder="Enter your name" />
        </div>
        <div className="inputGroup">
          <label>Email:</label>
          <input type="text" name="email" autoComplete="off" onChange={inputHandler} placeholder="Enter your email" />
        </div>
        <div className="inputGroup">
          <label>Address:</label>
          <input type="text" name="address" autoComplete="off" onChange={inputHandler} placeholder="Enter your address" />
        </div>
        <div className="inputGroup">
          <label>Upload photo:</label>
          <input type="file" name="image" autoComplete="off" onChange={imageHandler} />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
