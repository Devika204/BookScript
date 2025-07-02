import React, { useState, useEffect } from 'react';
import './user.css';
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user list from backend
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);  // Save in state
      } 
      catch (error) 
      {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Function to delete a user by ID
  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then(() => {
        // Remove the deleted user from UI
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User deleted successfully!',
          confirmButtonColor: '#3085d6',
          background: '#1e1e1e',
          color: '#ffffff'
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete user.',
          confirmButtonColor: '#d33',
          background: '#1e1e1e',
          color: '#ffffff'
        });
      });
  };

  // Function to update user
  const updateUser = async (userId, updatedData) => {
    await axios
      .put(`http://localhost:8000/api/update/user/${userId}`, updatedData)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            // Check if the current user's ID matches the one we want to update
            // If it matches, return a new user object with updated data from res.data
            // Otherwise, return the user as-is (no changes)
            user._id === userId ? { ...user, ...res.data } : user
          )
        );
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'User updated successfully!',
          confirmButtonColor: '#3085d6',
          background: '#1e1e1e',
          color: '#ffffff'
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error', // fixed
          title: 'Failed!',
          text: 'Failed to update user.',
          confirmButtonColor: '#3085d6',
          background: '#1e1e1e',
          color: '#ffffff'
        });
      });
  };


  return (
    <div class="hero_area" style={{backgroundColor:'black'}}>
     
        <header class="header_section">
          <nav class="navbar navbar-expand-lg custom_nav-container ">
            <a class="navbar-brand" href="index.html">
              <span className='form-title text-light'>
               Admin Page
              </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""></span>
            </button>
    
            <div class="link collapse navbar-collapse bg-dark" id="navbarSupportedContent">
              <ul class="navbar-nav  ">
                <li class="nav-item active">
    
                <Link to="/user" class="use1 nav-link">User Details<span class="sr-only">(current)</span></Link>
                  
                </li>
                <li class="nav-item">
          
                 <Link to="/products" class="use1 nav-link">Book Details<span class="sr-only"></span></Link>
                </li>
              
              </ul>
          
            </div>
          </nav>
        </header>
    
  
      <table className='table table-bordered' style={{ backgroundImage: "url('/images/bg3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', fontFamily:'Courier New, Courier, monospace'}}>
        <thead>
          <tr>
            <th style={{backgroundColor:'rgba(154, 95, 209, 0.519)'}}>Sl No</th>
            <th style={{backgroundColor:'rgba(154, 95, 209, 0.519)'}}>Name</th>
            <th style={{backgroundColor:'rgba(154, 95, 209, 0.519)'}}>Email</th>
            <th style={{backgroundColor:'rgba(154, 95, 209, 0.519)'}}>Phone</th>
       
            <th style={{backgroundColor:'rgba(154, 95, 209, 0.519)'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{index + 1}</td>
              <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{user.name}</td>
              <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{user.email}</td>
              <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{user.phone}</td>
              <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>
                &nbsp;
                <button
                  onClick={() => deleteUser(user._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                &nbsp;
                <button
                  onClick={() => updateUser(user._id)}
                  type="button"
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
