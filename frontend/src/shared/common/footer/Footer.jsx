import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const style = {color: "black", fontSize: "1.2em", marginBottom: "2%", marginLeft:"4pt" };

function Footer() {
    return (
        <footer class="text-center text-white" >
       <div class="row footer">
           <div class="col"></div>
       <div class="col footer-col">
        <h6 className="footer-title">AUCTION</h6>
        
          <Link to="/about" className="footer-link">About us</Link>
        
        <br />
        <Link to="/terms" className="footer-link">Terms and Conditions</Link>
        <br />
        <Link to="/privacy" className="footer-link">Privacy and Policy</Link>
        </div>
        <div class="col footer-col">
        <h6 className="footer-title">GET IN TOUCH</h6>
        <p className="footer-paragraph">Call Us at +123 797-567-2535</p>
       
        <p className="footer-paragraph">support@auction.com</p>
        
        <span class="footer-dot" ><a href="https://www.facebook.com/AtlantBH/"><FaFacebookF style={style} /></a></span>
      <span class="footer-dot" ><a href="https://instagram.com/atlantbh?lang=en"><TiSocialInstagram  style={style} /></a></span>
      <span class="footer-dot" ><a href="https://twitter.com/atlantbh?lang=en"><FaTwitter style={style} /></a></span>
      <span class="footer-dot" ><a href="https://www.atlantbh.com/"><TiSocialGooglePlus style={style} /></a></span>

        </div>
        <div class="col footer-col last-footer-col">
        <h6 className="footer-title">NEWSLETTER</h6>
        <p>Enter your email address and get notified about new products. We hate spam!</p>
        <div class="input-group">
  <div class="form-outline">
    <input type="email" class="form-control" id="email-input" placeholder="Your Email address" />
  </div>
  <button type="button" class="btn btn-primary" id="go-btn">
    <i>GO <RiArrowRightSLine /></i>
  </button>
</div>
        </div>
        <div class="col"></div>
        </div>
      </footer>
    )
}

export default Footer;