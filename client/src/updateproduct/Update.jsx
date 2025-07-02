import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './date.css'
import axios from "axios";
import Swal from 'sweetalert2';

const Update = () => {
  const [product, setProduct] = useState({
    // State to store book details
    name: "",
    author: "",
    price: "",
  });

  // Separate state to store selected image file
  const [image, setImage] = useState(null); // Separate state for image

  const navigate = useNavigate();
  const { id } = useParams();   // Get product ID from URL

  // Load existing product data from server when page loads
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);  // Fill the form with existing data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

console.log(product.name)

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("author", product.author);
    formData.append("price", product.price);

    if (image) {
      formData.append("image", image); // Add image if selected
    }

    try {
      // Send PUT request to backend
      await axios.put(`http://localhost:8000/api/update/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // After successful update, go back to book list
      navigate("/all_products");
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
      console.log("Error updating product:", error);
    }
  };

  return (
        <div className="hero_area">
          <header className="header_section">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <a className="navbar-brand" href="index.html">
                <span  className='form-title text-light' style={{fontFamily:'Cinzel Decorative'}}>ADMIN PAGE</span>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""></span>
              </button>
              <div className="collapse navbar-collapse bg-dark text-light" id="navbarSupportedContent">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <Link to="/add_products" className="nav-link">Add Books<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/all_products" className="nav-link text-light">View Book List<span className="sr-only"></span></Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        <section className="box1 layout_padding"  style={{backgroundImage: "url('/images/bg3.jpg')",backgroundSize: "cover",  backgroundPosition: "center",}}>

          <div className="box2 container container-bg">
            <div className="row">
                <div className="form-panel">
                  <form onSubmit={submitForm} className="update-form">
                    <h2 style={{fontFamily:'courier', textAlign:'center', fontSize:'50px', fontWeight:'bold'}}>UPDATE LIST</h2>

                  <div>
                    <label>Name: </label>
                    <input type="text" name="name" placeholder="Enter the Book Name"  value={product.name} onChange={inputHandler} />
                  </div>
                  <div>
                    <label>Author: </label>
                    <input type="text" name="author" placeholder="Enter the Authors Name"  value={product.author} onChange={inputHandler} />
                  </div>
                  <div>
                    <label>Price: </label>
                    <input type="number" name="price" placeholder="Enter the Price" value={product.price} onChange={inputHandler} />
                  </div>
                  <div>
                    <label>Poster: </label>
                    <input type="file" name="image" autoComplete="off" onChange={fileHandler} />
                  </div>
              
                  
                    <button className="button  ">Update Book</button>
                  
                </form>
                </div>
              </div>
          </div>
        </section>
      </div>
  );
};

export default Update;
