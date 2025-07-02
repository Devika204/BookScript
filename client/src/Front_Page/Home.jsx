import React, { useState, useEffect } from 'react';
import axios from "axios";
import './home.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Home() {
   const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); 
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setCartCount(storedCart.length);
  }, []);

  // Add product to cart in state and localStorage
  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    toast.success("Book added to cart!");
  };

  return (
    <div className='main_container'>
      <div className='top-bar'>
        <div className="user-button">
          BookScript
        </div>
        <div className="icon-group">
          <i className="fa-brands fa-facebook-f fa-sm social-icon"></i>
          <i className="fa-brands fa-twitter fa-sm social-icon"></i>
          <i className="fa-brands fa-youtube fa-sm social-icon"></i>
          <i className="fa-brands fa-square-behance fa-sm social-icon"></i>
          <Link to="/cart" className="position-relative">
            <i className="fa-sharp-duotone fa-solid fa-cart-shopping fa-sm social-icon"></i>
            {cartCount > 0 && (
              <span
                className="position-absolute start-100 translate-middle badge rounded-pill bg-danger px-3 py-0 fs-7"
                style={{ top: "-5px", right: "-10px" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <section id="home" className={`home ${menuOpen ? 'show' : ''}`}>
        <a href="#">HOME</a>
        <a href="#featured">FEATURED</a>
        <a href="#popular">POPULAR</a>
        <a href="#offer">OFFER</a>
        <a href="#article">ARTICLES</a>
        <a href="#download">DOWNLOAD APP</a>
      </section>

      <section id='carousal'>
        <div id="featuredCarousel" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-indicators">
            <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="2"></button>
          </div>

          <div class="carousel-inner">

            <div class="carousel-item active">
              <img src="images/book2.png" class="d-block w-100" alt="Slide 1" />
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>

            <div class="carousel-item">
              <img src="images/book3.png" class="d-block w-100" alt="Slide 2" />
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>

            <div class="carousel-item">
              <img src="images/book4.png" class="d-block w-100" alt="Slide 3" />
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>

          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>

        </div>
      </section>

      <h3 className='quality'>SOME QUALITY ITEMS</h3>

      <section id="featured" class="container py-5">

        <h1 className='feat-title'>Featured Books</h1>

        <div class="row row-cols-1 row-cols-md-4 g-4">
          
          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b1.png" class="card-img-top" alt="Book 1" />
              <div class="card-body">
                <h5 class="card-title">Hunting Adeline</h5>
                <p class="card-text">H. D. Carlton</p>
                <p class="fw-bold text-primary">₹649</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Hunting Adeline",
                  author: "H. D. Carlton",
                  price: 649,
                  image: "images/b1.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b2.png" class="card-img-top" alt="Book 2" />
              <div class="card-body">
                <h5 class="card-title">Powerless</h5>
                <p class="card-text">Lauren Roberts</p>
                <p class="fw-bold text-primary">₹389</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Powerless",
                  author: "Lauren Roberts",
                  price: 389,
                  image: "images/b2.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b3.png" class="card-img-top" alt="Book 3" />
              <div class="card-body">
                <h5 class="card-title">Watch Me</h5>
                <p class="card-text">Tahereh Mafi</p>
                <p class="fw-bold text-primary">₹334</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Watch Me",
                  author: "Tahereh Mafi",
                  price: 334,
                  image: "images/b3.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b4.png" class="card-img-top" alt="Book 4" />
              <div class="card-body">
                <h5 class="card-title">A Cruel Thirst</h5>
                <p class="card-text">Angela Montoya</p>
                <p class="fw-bold text-primary">₹341</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "A Cruel Thirst",
                  author: "Angela Montoya",
                  price: 341,
                  image: "images/b4.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h1 className='collection-title'>New Collection</h1>
      
      <section className="py-5" id="products">
        <div className="container">
          <div className="row g-4">
            {products.map((product, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                <div className="custom-card card text-white bg-dark h-100 border-0 shadow-lg">
                  <div className="card-img-box overflow-hidden">
                    {product.image ? (
                      <img
                        src={`http://localhost:8000${product.image}`}
                        alt={product.name}
                        className="card-img-top product-img"
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center bg-secondary" style={{height: '250px'}}>No Image</div>
                    )}
                  </div>
                  <div className="card-body text-center">
                    <h3 className="card-title">{product.name}</h3>
                    <p>{product.author}</p>
                    <p className="card-text fw-semibold text-info">₹{product.price}</p>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                  <div className="card-badge position-absolute top-0 start-0 bg-warning text-dark fw-bold px-2 py-1 rounded-end">
                    New
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="popular" class="container py-5">

        <h1 class="pop-title">Popular Books</h1>

        <div class="row row-cols-2 row-cols-md-4 g-4 text-center">

          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Fiction</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Mystery</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Romance</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Science Fiction</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Fantasy</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Thriller</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Biography</div>
          </div>
          <div class="col">
            <div class="genre-box p-4 shadow-sm rounded">Historical</div>
          </div>

        </div>

        <div class="row row-cols-1 row-cols-md-4 g-4 mt-4">
          
          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b5.png" class="card-img-top" alt="Book 1" />
              <div class="card-body">
                <h5 class="card-title">Dopamine Detox</h5>
                <p class="card-text">Thibaut Meurisse</p>
                <p class="fw-bold text-primary">₹195</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Dopamine Detox",
                  author: "Thibaut Meurisse",
                  price: 195,
                  image: "images/b5.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b6.png" class="card-img-top" alt="Book 2" />
              <div class="card-body">
                <h5 class="card-title">The Monk Who Sold His Ferrari</h5>
                <p class="card-text">Robin Sharma</p>
                <p class="fw-bold text-primary">₹199</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "The Monk Who Sold His Ferrari",
                  author: "Robin Sharma",
                  price: 199,
                  image: "images/b6.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b7.png" class="card-img-top" alt="Book 3" />
              <div class="card-body">
                <h5 class="card-title">How to Win Friends and Influence People</h5>
                <p class="card-text">Dale Carnegie</p>
                <p class="fw-bold text-primary">₹334</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "How to Win Friends and Influence People",
                  author: "Dale Carnegie",
                  price: 334,
                  image: "images/b7.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b8.png" class="card-img-top" alt="Book 4" />
              <div class="card-body">
                <h5 class="card-title">The Art of Negotiation</h5>
                <p class="card-text">Tim Castle</p>
                <p class="fw-bold text-primary">₹114</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "The Art of Negotiation",
                  author: "Tim Castle",
                  price: 114,
                  image: "images/b8.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

        </div>

      </section>

      <h3 className='quote-title'>Quote of the day</h3>
      <p className='quote'>“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”</p>
      <p className='quote-auth'>- Dr. Seuss</p>

      <section id='offer' class="container py-5">

        <h1 class="offer-title">Books with offer</h1>

        <div class="row row-cols-1 row-cols-md-4 g-4 mt-4">
          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b9.png" class="card-img-top" alt="Book 1" />
              <div class="card-body">
                <h5 class="card-title">Lady of Dragons</h5>
                <p class="card-text">Shelby Elizabeth</p>
                <p class="fw-bold text-primary text-dark"><span style={{color:'crimson'}}><strike >₹1120</strike></span> ₹999</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Lady of Dragons",
                  author: "Shelby Elizabeth",
                  price: 999,
                  image: "images/b9.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b10.png" class="card-img-top" alt="Book 2" />
              <div class="card-body">
                <h5 class="card-title">The sanctum key</h5>
                <p class="card-text">Sudharsana</p>
                <p class="fw-bold text-primary text-dark"><span style={{color:'crimson'}}><strike >₹400</strike></span> ₹359</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "The sanctum key",
                  author: "Sudharsana",
                  price: 359,
                  image: "images/b10.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b11.png" class="card-img-top" alt="Book 3" />
              <div class="card-body">
                <h5 class="card-title">Empress of All Seasons</h5>
                <p class="card-text">Emiko Jean</p>
                <p class="fw-bold text-primary text-dark"><span style={{color:'crimson'}}><strike >₹921</strike></span> ₹855</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "Empress of All Seasons",
                  author: "Emiko Jean",
                  price: 855,
                  image: "images/b11.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center">
              <img src="images/b8.png" class="card-img-top" alt="Book 4" />
              <div class="card-body">
                <h5 class="card-title">The Art of Negotiation</h5>
                <p class="card-text">Tim Castle</p>
                <p class="fw-bold text-primary text-dark"><span style={{color:'crimson'}}><strike >₹114</strike></span> ₹100</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart({
                  title: "The Art of Negotiation",
                  author: "Tim Castle",
                  price: 100,
                  image: "images/b8.png"
                })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

       <h1 className='art-title'>Read Our Article</h1>

      <section id='article' class="container py-5">
        <h2 class="article-title text-center text-light mb-4">Book Articles</h2>
        <div class="row g-4">

          <div class="col-md-4">
            <div class="card bg-dark text-light h-100 border-0 shadow article-card">
              <img src="images/article1.png" class="card-img-top" alt="Book Article 1" />
              <div class="card-body">
                <h5 class="card-title">The Power of Words</h5>
                <p class="card-text">
                  Discover how storytelling shapes our emotions and society. Dive into the psychology of literature and its timeless magic.
                </p>
              </div>
              <div class="card-footer bg-transparent border-0 text-end">
                <a href="#" class="btn btn-sm btn-outline-light">Read More</a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-dark text-light h-100 border-0 shadow article-card">
              <img src="images/article2.png" class="card-img-top" alt="Book Article 2" />
              <div class="card-body">
                <h5 class="card-title">Fiction vs Reality</h5>
                <p class="card-text">
                  Are books a mirror or a window? We explore how fiction can influence real-world thinking and decision-making.
                </p>
              </div>
              <div class="card-footer bg-transparent border-0 text-end">
                <a href="#" class="btn btn-sm btn-outline-light">Read More</a>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-dark text-light h-100 border-0 shadow article-card">
              <img src="images/article4.png" class="card-img-top" alt="Book Article 3" />
              <div class="card-body">
                <h5 class="card-title">Books in the Digital Age</h5>
                <p class="card-text">
                  In an era of screens, do printed books still matter? Explore how digital formats are transforming reading habits.
                </p>
              </div>
              <div class="card-footer bg-transparent border-0 text-end">
                <a href="#" class="btn btn-sm btn-outline-light">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="download" class="download-section text-center text-light py-5">
        <div class="container">
          <h1 class="down-text mb-4">Download the BookScript App</h1>
          <p class="mb-4">Get access to thousands of books right from your phone. Available on both Android and iOS.</p>
          
          <div class="d-flex justify-content-center gap-4 flex-wrap">
            <a href="#" class="store-btn">
              <img src="images/google.png" alt="Google Play" />
            </a>
            <a href="#" class="store-btn">
              <img src="images/app.png" alt="App Store" />
            </a>
          </div>
        </div>
      </section>

      <footer class="footer-section text-light py-4">
        <div class="container">
          <div class="row">

            <div class="col-md-4 mb-3">
              <h5 class="footer-logo">BookScript</h5>
              <p>Your favorite online bookstore with top collections and quality picks.</p>
            </div>

            <div class="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul class="list-unstyled">
                <li><a href="#">Home</a></li>
                <li><a href="#featured">Featured</a></li>
                <li><a href="#popular">Popular</a></li>
                <li><a href="#article">Articles</a></li>
                <li><a href="#download">Download App</a></li>
              </ul>
            </div>

            <div class="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <div class="footer-icons">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-youtube"></i>
              </div>
            </div>

          </div>
          <hr class="bg-light" />
          <div class="text-center small">&copy; 2025 BookScript. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
export default Home;
