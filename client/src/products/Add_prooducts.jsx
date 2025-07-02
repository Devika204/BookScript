import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './addpro.css'
import Swal from 'sweetalert2';

function Add_prooducts() {

  const [user, setUser] = useState({
    name: "",
    author: "" ,
    price: "",
    image: null, // Store file object
  });

  const navigate = useNavigate();

  // **Handle text input changes**
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // **Handle image file selection**
  const imageHandler = (e) => {
    const file = e.target.files[0]; // Get the selected file (first file if multiple are selected)
    setUser((prevUser) => ({ ...prevUser, image: file })); // Update user state with the file
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); // .append("key", value) adds each field to the FormData object.
    formData.append("name", user.name);
    formData.append("author", user.author);
    formData.append("price", user.price);
    formData.append("image", user.image);  // Ensure file is sent correctly

    try {
        await axios.post("http://localhost:8000/api/product_details", formData, {
            headers: { "Content-Type": "multipart/form-data" } // The Content-Type: multipart/form-data header 
            // ensures the request properly transmits the file and text data.
        });
        navigate("/products");
        console.log("Book added successfully");
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Book added successfully!',
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
  <div className="hero_area"  style={{backgroundColor:'black', width: "100%",}}>
    <header className="header_section">
      <nav className="navbar navbar-expand-lg custom_nav-container ">
        <a className="title1 navbar-brand" href="index.html"><span><div className="container px-0">
        <div className="add_item heading_container">
          <h1 className="form-title">ADMIN PAGE</h1>
        </div>
      </div></span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class=""></span>
        </button>
        <div className="link collapse navbar-collapse bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav  ">
            <li className="nav-item active">
              <Link to="/add_products" className="use1 nav-link">Add Books<span className="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link to="/all_products" className="use1 nav-link">View Book List<span className="sr-only"></span></Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    
    <section class="contact_section layout_padding">
      <video autoPlay muted loop className="bg-video">
        <source src="/images/vid.mp4" type="video/mp4" />
      </video>

      

      <div class="contain">
        <div className="left-panel">
          <div className="box">
            <h3 className="title">Live Preview</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Author:</strong> {user.author}</p>
            <p><strong>Price:</strong> ₹{user.price}</p>
            {user.image && <img src={URL.createObjectURL(user.image)} alt="preview" />}
          </div>
        </div>

          <div class="right-panel">
            <form className="user-form" onSubmit={submitForm}>
              <div>
                <label>Book Name : </label>
                <input type="text" name="name" placeholder="Enter the book name"  onChange={inputHandler} />
              </div>
              <div>
                <label>Author Name : </label>
                <input type="text" name="author" placeholder="Enter the author name"  onChange={inputHandler} />
              </div>
              <div>
                <label>Price : </label>
                <input type="number" name="price" placeholder="Enter price" onChange={inputHandler} />
              </div>
              <div>
                <label>Upload Image : </label>
                <input type="file" name="image" autoComplete="off" onChange={imageHandler} />
              </div>
    
              <div class="submit-btn d-flex ">
                <button type="submit">Add Book</button>
              </div>
            </form>
          </div>
        </div>
    </section>
  </div>
  )
}

export default Add_prooducts