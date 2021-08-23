import React, { useState } from "react";

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
import { useUserContext, useSearchContext } from "../../../AppContext";

import "./Header.scss";

export default function Header() {
	const history = useHistory();
	const [searchKey, setSearchKey] = useState();
	const { loggedIn, setLoggedIn } = useUserContext();
	const { setSearchWord, setFromSearchBar } = useSearchContext();

	const singOut = () => {
		AuthenticationService.signOut();
		setLoggedIn(false);
		history.push("/login");
	};

	const searchForItems = () => {
		setSearchWord(searchKey);
		setFromSearchBar(true);
		history.push({
			pathname: "/products",
			state: {
				categoryId: "1",
				categoryTag: searchKey,
			},
		});
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
							value={searchKey}
							onChange={(e) => setSearchKey(e.target.value)}
						/>
						<span className="input-group-text border-0" id="search-addon">
							<button className="search-icon" onClick={searchForItems}>
								<FaSearch />
							</button>
						</span>
					</div>
				</div>
				<div className="col">
					<section className="row">
						<Link
							className="nav-link links"
							to={{ pathname: "/" }}
							style={footerText}
						>
							HOME
						</Link>
						<Link
							className="nav-link links"
							style={footerText}
							to={{
								pathname: "/products",
								state: { categoryId: "1", categoryTag: "Fashion" },
							}}
						>
							SHOP
						</Link>
						<Link
							className="nav-link links"
							to={{
								pathname: "/myaccount",
							}}
							style={footerText}
						>
							MY ACCOUNT
						</Link>
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
