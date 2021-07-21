import React from 'react';

import { Navbar } from 'react-bootstrap';
import { FaSearch, FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";

import { headerSocialIcon, headerLoginReg, headerPlainText, footerText } from '../../styles/PageStyles';


import './Header.scss';


function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-black">

        <Navbar.Brand className="upper-navbar top">

          <span className="dot" ><a href="https://www.facebook.com/AtlantBH/"><FaFacebookF style={headerSocialIcon} /></a></span>
          <span className="dot" ><a href="https://instagram.com/atlantbh?lang=en"><TiSocialInstagram style={headerSocialIcon} /></a></span>
          <span className="dot" ><a href="https://twitter.com/atlantbh?lang=en"><FaTwitter style={headerSocialIcon} /></a></span>
          <span className="dot" ><a href="https://www.atlantbh.com/"><TiSocialGooglePlus style={headerSocialIcon} /></a></span>

        </Navbar.Brand>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a style={headerLoginReg} className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a style={headerPlainText} className="nav-link" href="/register" >or</a>
          </li>
          <li className="nav-item">
            <a style={headerLoginReg} className="nav-link" href="/register">Create an Account</a>
          </li>
        </ul>

      </Navbar>
      <section className="row">
        <div className="col">
          <img src='\images\auction_logo.PNG' alt="Auction logo"/>
        </div>
        <div className="col">
          <div className="input-group rounded">
            <input type="search" className="form-control rounded header-input" placeholder="Try enter: Shoes" aria-label="Search"
              aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
              <a className="search-icon" href="#home"><FaSearch /></a>
            </span>
          </div>
        </div>
        <div className="col">
          <section className="row">
            <a className="nav-link links" href="/" style={footerText}>HOME</a>
            <a className="nav-link links" href="/shop" style={footerText}>SHOP</a>
            <a className="nav-link links" href="/myaccount" style={footerText}>MY ACCOUNT</a>
          </section>
        </div>
      </section>
    </>
  )
}

export default Header;