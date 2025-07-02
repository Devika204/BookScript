import React from "react";
import { Link } from "react-router-dom";
import './admin.css';

function Admin() {
  return (
    <div>
      <div className="hero_area">
        <header className="header_section">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span className="brand-text" style={{color:'white', fontFamily: 'Cinzel Decorative, serif', fontWeight:'200', fontStyle:'normal', fontSize:'49px'}}>
                Admin Page
              </span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item text-dark">
                  <Link to="/user" className="use1 nav-link text-light">User Details</Link>
                </li>
                <li className="nav-item text-dark">
                  <Link to="/products" className="use1 nav-link text-light">Book Details</Link>
                </li>
              </ul>
            </div>

            <svg className="spinner" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            
              <circle className="spin2" cx="400" cy="400" fill="none"
                r="300" strokeWidth="50" stroke="#E387FF"
                strokeDasharray="700 100"
                strokeLinecap="round" />

              <text className="svg-text" x="400" y="420" textAnchor="middle">
                Welcome Admin
              </text>

            </svg>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default Admin;
