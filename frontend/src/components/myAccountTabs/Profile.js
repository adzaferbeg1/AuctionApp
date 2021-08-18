import React from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import LabelNavbar from "../../shared/common/LabelNavbar";

const Profile = () => {
	const range = (start, stop, step) =>
		Array.from(
			{ length: (stop - start) / step + 1 },
			(_, i) => start + i * step
		);
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"Novemeber",
		"December",
	];
	let days = range(1, 31, 1);
	let years = range(1930, 2021, 1);
	let expYears = range(2021, 2030, 1);
	let expMonths = range(1, 12, 1);

	return (
		<div className="profile">
			<div className="required">
				<LabelNavbar label={"REQUIRED"} />
				<div className="content-below-nav">
					<div className="photo-form">
						<img alt="user" src="images/guy-profile-pic.PNG"></img>
						<button>CHANGE PHOTO</button>
					</div>
					<div className="req-form">
						<label>First Name</label>
						<input type="text"></input>
						<label>Last Name</label>
						<input type="text"></input>
						<label>I am</label>
						<select>
							<option>Male</option>
							<option>Female</option>
						</select>
						<label>Date of Birth</label>
						<div className="birth-from">
							<select>
								{months.length !== 0
									? months.map((month) => <option key={month}>{month}</option>)
									: null}
							</select>
							<select>
								{days.length !== 0
									? days.map((day) => <option key={day}>{day}</option>)
									: null}
							</select>
							<select>
								{years.length !== 0
									? years.map((yr) => <option key={yr}>{yr}</option>)
									: null}
							</select>
						</div>
						<div className="input-group mb-3">
							<input
								type="tel"
								className="form-control"
								pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
								aria-describedby="basic-addon2"
							/>
							<div className="input-group-append">
								<span className="input-group-text" id="basic-addon2">
									Verified
								</span>
							</div>
						</div>
						<label>Email Address</label>
						<input type="email"></input>
					</div>
				</div>
			</div>

			<div className="card-info">
				<LabelNavbar label={"CARD INFORMATION"} />
				<div className="content-below-nav">
					<div className="card-form">
						<div>
							<input type="checkbox" name="paypal" />
							<label>Pay Pal</label>
						</div>
						<div>
							<input type="checkbox" name="card" />
							<label>Credit Card</label>
						</div>
						<p>We accept the following credit cards</p>
						<div className="cards-img">
							<img
								alt="visa"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
							></img>
							<img
								alt="master"
								src="https://w7.pngwing.com/pngs/92/785/png-transparent-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo-sign.png"
							></img>
							<img
								alt="maestro"
								src="https://w7.pngwing.com/pngs/412/118/png-transparent-maestro-debit-card-mastercard-credit-card-payment-card-mastercard-text-logo-payment.png"
							></img>
							<img
								alt="blue"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
							></img>
						</div>
					</div>
					<div className="card-owner-details">
						<div className="labels">
							<label>Name on Card</label>
							<label>Card Number</label>
						</div>
						<div>
							<input type="text" placeholder="e.g. Adam Smith" />
							<input type="text" placeholder="e.g. 4242 4242 4242 4242" />
						</div>
					</div>
					<div className="card-owner-details">
						<div className="labels">
							<label>Expiration Date</label>
							<label>
								CVC/CW{" "}
								<a href="https://help.gopay.com/en/knowledge-base/security/what-is-cvv-cvc-code-and-where-can-i-find-it-on-my-card">
									<BsFillQuestionCircleFill />
								</a>
							</label>
						</div>
						<div>
							<select>
								{expYears.length !== 0
									? expYears.map((yr) => <option key={yr + "exp"}>{yr}</option>)
									: null}
							</select>
							<select>
								{expMonths.length !== 0
									? expMonths.map((month) => (
											<option key={month}>{month}</option>
									  ))
									: null}
							</select>
							<input type="text" placeholder="1234" />
						</div>
					</div>
				</div>
			</div>
			<div className="optional">
				<LabelNavbar label={"OPTIONAL"} />
				<div className="content-below-nav">
					<h3>Address</h3>
					<label>Street</label>
					<input type="text" placeholder="e.g. 5th Avenue" />
					<div className="city-zip-container">
						<label>City</label>
						<label>Zip Code</label>
					</div>
					<div className="city-zip-container">
						<input type="text" placeholder="e.g. New York" />
						<input type="text" placeholder="e.g. 10056" />
					</div>
					<label>State</label>
					<input type="text" placeholder="e.g. New York" />
					<label>Country</label>
					<input type="text" placeholder="e.g. USA" />
				</div>
			</div>
			<button className="save-info-btn">
				SAVE INFO <RiArrowRightSLine />
			</button>
		</div>
	);
};

export default Profile;
