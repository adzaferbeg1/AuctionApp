import React from 'react';
import { Navbar } from 'react-bootstrap';
import { FaSearch, FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";
import './Header.css';
import { Link } from 'react-router-dom';

const style = {color: "black", fontSize: "1em", marginBottom: "12%", marginLeft:"1%" };
const style2 = {color: "white"};
const style3 = {color: "grey"};

function Header() {
    return(
        <>
        <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-black">
           
  <Navbar.Brand className="upper-navbar top">
  
      <span class="dot" ><a href="https://www.facebook.com/AtlantBH/"><FaFacebookF style={style} /></a></span>
      <span class="dot" ><a href="https://instagram.com/atlantbh?lang=en"><TiSocialInstagram  style={style} /></a></span>
      <span class="dot" ><a href="https://twitter.com/atlantbh?lang=en"><FaTwitter style={style} /></a></span>
      <span class="dot" ><a href="https://www.atlantbh.com/"><TiSocialGooglePlus style={style} /></a></span>

       </Navbar.Brand>
       <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a style={style2}  class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
            <a style={style3}  class="nav-link">or</a>
            </li>
            <li class="nav-item">
                <a style={style2} class="nav-link" href="/register">Create an Account</a>
            </li>
        </ul>
        
</Navbar>
<section class="row">
        <div class="col">
        <img src='\images\auction_logo.PNG' alt="Auction logo"/>
        </div>
        <div class="col">
        <div class="input-group rounded">
  <input type="search" class="form-control rounded header-input" placeholder="Try enter: Shoes" aria-label="Search"
    aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
    <a className="search-icon" href="#home"><FaSearch /></a>
  </span>
</div>
        </div>
        <div class="col">
        <section class="row">
        <a class="nav-link links" href="#"><Link id="white-nav-link" to="/home" style={{color:"black"}}>HOME</Link></a>
        <a class="nav-link links" href="#"><Link to="/shop" style={{color:"black"}}>SHOP</Link></a>
        <a class="nav-link links" href="#"><Link to="/myaccount" style={{color:"black"}}>MY ACCOUNT</Link></a>
        </section>
        </div>
       </section>
       </>
    )
}

export default Header;