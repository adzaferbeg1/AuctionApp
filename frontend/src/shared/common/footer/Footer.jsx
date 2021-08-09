import React from "react";

import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import { footerSocialIcon } from "../../styles/PageStyles";

import "./Footer.scss";

export default function Footer() {
	return (
		<footer className="text-center text-white footer">
			<div className="row footer">
				<div className="col"></div>
				<div className="col footer-col">
					<h6 className="footer-title">AUCTION</h6>

					<Link to="/about" className="footer-link">
						About us
					</Link>

					<br />
					<Link to="/terms" className="footer-link">
						Terms and Conditions
					</Link>
					<br />
					<Link to="/privacy" className="footer-link">
						Privacy and Policy
					</Link>
				</div>
				<div className="col footer-col">
					<h6 className="footer-title">GET IN TOUCH</h6>
					<p className="footer-paragraph">Call Us at +123 797-567-2535</p>

					<p className="footer-paragraph">support@auction.com</p>

					<span className="footer-dot">
						<a href="https://www.facebook.com/AtlantBH/">
							<FaFacebookF style={footerSocialIcon} />
						</a>
					</span>
					<span className="footer-dot">
						<a href="https://instagram.com/atlantbh?lang=en">
							<TiSocialInstagram style={footerSocialIcon} />
						</a>
					</span>
					<span className="footer-dot">
						<a href="https://twitter.com/atlantbh?lang=en">
							<FaTwitter style={footerSocialIcon} />
						</a>
					</span>
					<span className="footer-dot">
						<a href="https://www.atlantbh.com/">
							<TiSocialGooglePlus style={footerSocialIcon} />
						</a>
					</span>
				</div>
				<div className="col footer-col last-footer-col">
					<h6 className="footer-title">NEWSLETTER</h6>
					<p>
						Enter your email address and get notified about new products. We
						hate spam!
					</p>
					<div className="input-group">
						<div className="form-outline">
							<input
								type="email"
								className="form-control"
								id="email-input"
								placeholder="Your Email address"
							/>
						</div>
						<button type="button" className="btn btn-primary" id="go-btn">
							<i>
								GO <RiArrowRightSLine />
							</i>
						</button>
					</div>
				</div>
				<div className="col"></div>
			</div>
		</footer>
	);
}
