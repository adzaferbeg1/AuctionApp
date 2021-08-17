import React from "react";

import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram, TiSocialGooglePlus } from "react-icons/ti";
import { useHistory } from "react-router-dom";

import AuthenticationService from "../../../services/AuthenticationService";
import {
	headerSocialIcon,
	headerLoginReg,
	headerPlainText,
	footerText,
} from "../../styles/PageStyles";
import { useUserContext } from "../../../AppContext";

import "./Header.scss";

export default function Header() {
	const history = useHistory();
	const { loggedIn, setLoggedIn } = useUserContext();

	const singOut = () => {
		AuthenticationService.signOut();
		setLoggedIn(false);
		history.push("/login");
	};

	return (
		<div className="main-header">
			<Navbar
				collapseOnSelect
				expand="xl"
				variant="dark"
				className="navbar-black"
			>
				<Navbar.Brand className="upper-navbar top">
					<span className="dot">
						<a href="https://www.facebook.com/AtlantBH/">
							<FaFacebookF style={headerSocialIcon} />
						</a>
					</span>
					<span className="dot">
						<a href="https://instagram.com/atlantbh?lang=en">
							<TiSocialInstagram style={headerSocialIcon} />
						</a>
					</span>
					<span className="dot">
						<a href="https://twitter.com/atlantbh?lang=en">
							<FaTwitter style={headerSocialIcon} />
						</a>
					</span>
					<span className="dot">
						<a href="https://www.atlantbh.com/">
							<TiSocialGooglePlus style={headerSocialIcon} />
						</a>
					</span>
				</Navbar.Brand>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<a style={headerLoginReg} className="nav-link" href="/login">
							Login
						</a>
					</li>
					<li className="nav-item">
						<p style={headerPlainText} className="nav-link">
							or
						</p>
					</li>
					<li className="nav-item">
						<a style={headerLoginReg} className="nav-link" href="/register">
							Create an Account
						</a>
					</li>
				</ul>
			</Navbar>
			<section className="row">
				<div className="col">
					<a href="/">
						<img src="\images\auction_logo.PNG" alt="Auction logo" />
					</a>
				</div>
				<div className="col">
					<div className="input-group rounded">
						<input
							type="search"
							className="form-control rounded header-input"
							placeholder="Try enter: Shoes"
							aria-label="Search"
							aria-describedby="search-addon"
						/>
						<span className="input-group-text border-0" id="search-addon">
							<a className="search-icon" href="#home">
								<FaSearch />
							</a>
						</span>
					</div>
				</div>
				<div className="col">
					<section className="row">
						<a className="nav-link links" href="/" style={footerText}>
							HOME
						</a>
						<Link
							className="nav-link links"
							style={footerText}
							to={{ pathname: "/products", state: { categoryId: "1" } }}
						>
							SHOP
						</Link>
						<a className="nav-link links" href="/myaccount" style={footerText}>
							MY ACCOUNT
						</a>
						{loggedIn ? (
							<a
								id="log-out-btn"
								className="nav-link links"
								href="/login"
								onClick={singOut}
							>
								LOG OUT
							</a>
						) : null}
					</section>
				</div>
			</section>
		</div>
	);
}
