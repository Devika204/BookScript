import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './viewprod.css'
import Swal from 'sweetalert2';

const View_products = () => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products from backend
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data); // Store data in products state
      } 
      catch (error) 
      {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/product/${productId}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Book deleted successfully!',
          confirmButtonColor: '#3085d6',
          background: '#1e1e1e',  
          color: '#ffffff'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div>
      <div class="hero_area">
        <header class="header_section">
          <nav class="navbar navbar-expand-lg custom_nav-container ">

            <a class="navbar-brand" href="index.html">
              <div className="add_item heading_container">
                <h1 className="form-title">ADMIN PAGE</h1>
              </div>
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""></span>
            </button>
    
            <div class="link collapse navbar-collapse bg-dark" id="navbarSupportedContent">
              <ul class="navbar-nav  ">
                <li class="nav-item">
                 <Link to="/add_products" class="use1 nav-link text-dark">Add Books<span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item active">
                  <Link to="/all_products" class="use1 nav-link">View Book List<span class="sr-only"></span></Link>
                </li>
              </ul>
            </div>

          </nav>
        </header>
      
      <div className='userTable' style={{backgroundImage: "url('/images/bg1.jpg')", width: "100%",backgroundSize: "cover",  backgroundPosition: "center"}}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Book Name</th>
              <th>Authors Name</th>
              <th>Price</th>
              <th>Poster</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{index + 1}</td>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{product.name}</td>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{product.author}</td>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>{product.price}</td>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>
                  {product.image ? (
                    <img 
                      src={`http://localhost:8000${product.image}`} 
                      alt="User" 
                      width="50" 
                      height="50" 
                      style={{ borderRadius: "30px" }}
                    />
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td style={{backgroundColor:'rgba(231, 225, 236, 0.52)'}}>
                  <Link to={`/update/${product._id}`} type="button" className="btn btn-success">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  &nbsp;
                  <button onClick={() => deleteProduct(product._id)} type="button" className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default View_products;
