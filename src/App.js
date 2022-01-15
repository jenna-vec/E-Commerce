import './App.css';
import React, { useState, useEffect } from 'react';
import { Home, Footer, About, Products, ProductDisplay, SearchResults, Cart } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { commerce } from './library/commerce';
import { Link } from 'react-router-dom';
import logo from './library/white-egg.png';

function App() {

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const [searchResults, setSearchResults] = useState([]);

  const Navbar = () => {

    const navigate = useNavigate();

    //Toggles the hamburger drop down menu
    const [isActive, setActive] = useState("false");
  
    //Open Hamburger Menu
    const handleToggle = () => {
      setActive(!isActive);
      const navPanel = document.getElementById("nav-table")
      if (isActive) {
        navPanel.style.cssText = "top: 0%; transition: top 0.8s ease-in-out;"
      }
      else {
        navPanel.style.cssText = "top: -64%; transition: top 0.8s ease-in-out;"
      }
    };
  
    //Get Search Results
    const [searchTerm, setSearchTerm] = useState("");
  
    const revealSearch = () => {
      const searchBar = document.getElementById("search-bar");
      if (searchBar.style.visibility === "visible"){
        getResults();
      }
      else{
        searchBar.style.visibility = "visible";
      }
    }
  
    const searchEnter = (e) => {
      if (e.key === 'Enter') {
        getResults();
      }
    }
  
    const getResults = (e) => {
      let searchResults = [];
      for(var i = 0; i < products.length; i++){
        if(products[i].description.includes(searchTerm)){
          searchResults.push(products[i]);
        }
      }
      setSearchResults(searchResults);
      navigate("/search-results");
    }
  
    return (
      <div>
      <div className="navigation">
        <div className="nav-logo-div">
          <Link to="/">
            <img className="nav-logo" alt="hi egg logo" src={logo} />
          </Link>
        </div>
        <div id="column-nav">
          <Link to="/"><h3>hi egg</h3></Link>
            <div className="landscape-navigation">
              <Link to='/tees'>tees</Link>
              <Link to='/pull-overs'>pull-overs</Link>
              <Link to='/sweats'id="sweats">sweats</Link>
          </div>
        </div>
        <div className="buttons">
          <div className="button-child" id="search-bar"><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={searchEnter} type="text" id="bar" /></div>
          <svg className="button-child" id="magnifier" data-name="magnifier" viewBox="0 0 288 288" onClick={revealSearch}><defs></defs><path d="M271.59,259.39l-58-58a121,121,0,1,0-25,21.67l59.7,59.7a16.5,16.5,0,0,0,23.34-23.33ZM34.6,121.57a88,88,0,1,1,88,88A88.13,88.13,0,0,1,34.6,121.57Z"/></svg>
          <p className="cart-number button-child">
            <Link to='/cart'>
              <svg id="basket-cart" data-name="basket-cart" viewBox="0 0 288 288">
                <path d="M276.2,54.8a14.5,14.5,0,0,0-6-1.23L79,53.8S64.16,3.66,32.63,3.66H18.26A15.28,15.28,0,0,0,2.85,17.94a15,15,0,0,0,15,15.72h0A31.87,31.87,0,0,1,48.26,56L88.72,185.54,69.1,218.79S53.32,244.38,53,268.55c-.12,8.27,6.4,15.61,14.67,15.78a15,15,0,0,0,15.32-15v-.43C83,258,96.24,259,101.7,259h99.49c5.46,0,17-.28,17,9.89h0a15.27,15.27,0,0,0,14.27,15.41,15,15,0,0,0,15.73-15c0-19.61-9.65-34.12-39.9-34.12h-114a66.68,66.68,0,0,1,57.42-32.79h91.26a15,15,0,0,0,14.62-11.65L284.78,71.92A15.07,15.07,0,0,0,276.2,54.8ZM231,172.43H116.06L88.36,83.79l163-.2Z"/>
              </svg>
            </Link>
          </p>
          <svg className={isActive ? "hamburger" : "hamburger is-active"} onClick={handleToggle} viewBox="0 0 288 288"><g id="bottom-bar"><path d="M248.08,254H39.92a13,13,0,0,1,0-26H248.08a13,13,0,0,1,0,26Z"/></g><g id="middle-bar"><path d="M248.08,157H39.92a13,13,0,0,1,0-26H248.08a13,13,0,0,1,0,26Z"/></g><g id="top-bar"><path d="M248.08,60H39.92a13,13,0,0,1,0-26H248.08a13,13,0,0,1,0,26Z"/></g></svg>
        </div>
      </div>
      <div id="nav-table" className="nav-panel">
        <div className="table-contents">
          <Link to='/products'><h4 id="shop-hamburger-title">shop</h4></Link>
          <Link to='/tees'>tees</Link>
          <Link to='/pull-overs'>pull-overs</Link>
          <Link to='/sweats'>sweats</Link>
          <Link to='/about'><h4 id="shop-hamburger-title" className="about-open">about</h4></Link>
        </div>  
      </div>
      </div>
    );
  }

  const [tees, setTees] = useState([]);
  const fetchTees = async () => {
    const { data } = await commerce.products.list({category_slug: ['tee-shirts']});
    setTees(data);
  };

  const [pullOvers, setPullOvers] = useState([]);
  const fetchPullOvers = async () => {
    const { data } = await commerce.products.list({category_slug: ['pull-overs']});
    setPullOvers(data);
  };

  const [sweats, setSweats] = useState([]);
  const fetchSweats = async () => {
    const { data } = await commerce.products.list({category_slug: ['sweats']});
    setSweats(data);
  };

 
  const [cart, setCart] = useState({});
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };



  /*
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };*/

  useEffect(() => {
    fetchProducts(); fetchTees(); fetchPullOvers(); fetchSweats(); setSearchResults(); fetchCart()
  }, []);

  return (
    <Router>
        <Navbar />
        <div className='body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route exact path="/products" element={<Products products={products} />} />
            <Route exact path="/search-results" element={<SearchResults products={searchResults} />} />
            <Route exact path="/tees" element={<Products products={tees} />} />
            <Route exact path="/pull-overs" element={<Products products={pullOvers} />} />
            <Route exact path="/sweats" element={<Products products={sweats} />} />
            <Route path='/item' element={<ProductDisplay />}/>
            <Route exact path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart}/>} />
          </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;