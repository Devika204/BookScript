import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DigitalClock from './DigitalClock';
import DashboardChart from './DashboardChart';
import axios from 'axios';
import './product.css'

function Product() {
  // States to hold number of users and products
  const [usersCount, setUsersCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Fetch number of registered users
    axios.get("http://localhost:8000/api/users")
      .then(res => setUsersCount(res.data.length))  // Count users from response
      .catch(err => console.error(err));

    // Fetch total stock left
    axios.get("http://localhost:8000/api/products")
  .then(res => {
    setProductCount(res.data.length); // Count products
  })
  }, []);

  return (
    <div>

<div class="hero_area">
 
    <header class="header_section">
      <nav class="navbar navbar-expand-lg custom_nav-container ">
        <a class="navbar-brand" href="index.html">
          <span className="form-title text-light">
           ADMIN PAGE
          </span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class=""></span>
        </button>

        <div class="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
          <ul class="navbar-nav  ">
            <li class="nav-item">

            <Link to="/add_products" class="use1 nav-link">Add Book<span class="sr-only">(current)</span></Link>
              
            </li>
            <li class="nav-item">
                <Link to="/all_products" class="use1 nav-link">View Book List<span class="sr-only"></span></Link>
            </li>
          
          </ul>
      
        </div>
      </nav>
    </header>
      <div className="content_area">
        <div className="content_section" style={{ flexDirection: 'column', alignItems: 'center', color: 'white' }}>
          <DigitalClock />
          <p className="para" style={{ marginTop: '20px', textAlign: 'center', fontStyle: 'italic' }}>
            "A reader lives a thousand lives before he dies. The man who never reads lives only one." — George R.R. Martin
          </p>
        </div>
        <div className="content_section">
          <DashboardChart usersCount={usersCount} productCount={productCount} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Product