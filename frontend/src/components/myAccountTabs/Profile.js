import React, { useEffect, useState, useRef } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import AuthenticationService from "../../services/AuthenticationService";
import LabelNavbar from "../../shared/common/LabelNavbar";

function Profile({ user }) {
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const [userSurname, setUserSurname] = useState();
	const [userPhone, setUserPhone] = useState();
	const [userEmail, setUserEmail] = useState();
	const [userAddress, setUserAddress] = useState();
	const [userSex, setUserSex] = useState();
	const [userYear, setUserYear] = useState();
	const [userMonth, setUserMonth] = useState();
	const [userDay, setUserDay] = useState();
	const [profilePicture, setProfilePicture] = useState([]);
	const fileInput = useRef(null);
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

	const findMonth = (month) => {
		switch (month) {
			case "01":
				return "January";
			case "02":
				return "February";
			case "03":
				return "March";
			case "04":
				return "April";
			case "05":
				return "May";
			case "06":
				return "June";
			case "07":
				return "July";
			case "08":
				return "August";
			case "09":
				return "September";
			case "10":
				return "October";
			case "11":
				return "November";
			case "12":
				return "December";
			default:
				return "January";
		}
	};

	const formatUserDate = (date) => {
		if (date === null) return;
		var splitDate = date.split("-");
		setUserYear(splitDate[0]);
		setUserMonth(splitDate[1]);
		setUserDay(splitDate[2]);
		var monthDropDown = document.getElementById("month-drop-menu");
		monthDropDown.value = findMonth(splitDate[1]);
		var dayDropDown = document.getElementById("day-drop-menu");
		dayDropDown.value = splitDate[2];
	};

	useEffect(() => {
		setUserId(user.id);
		setUserName(user.name);
		setUserSurname(user.surname);
		setProfilePicture("images/guy-profile-pic.PNG");
		setUserPhone(user.phoneNumber);
		setUserEmail(user.email);
		setUserAddress(user.address);
		setUserSex(user.sex);
		formatUserDate(user.birthDate);
	}, []);

	const changeProfilePicture = async (e) => {
		const file = e.target.files[0];
		setProfilePicture(await uploadImage(file));
	};

	const uploadImage = (img) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const saveChanges = async () => {
		if (
			userName === "" ||
			userSurname === "" ||
			userPhone === undefined ||
			userPhone === "" ||
			userEmail === ""
		) {
			alert("WARNING: All fields in the REQUIRED form must be filled");
			return;
		} else {
			AuthenticationService.updateInformation(
				userName,
				userSurname,
				userYear + "-" + userMonth + "-" + userDay,
				userPhone,
				userEmail,
				userAddress,
				userSex,
				userId
			).then(
				() => {
					window.location.reload();
					window.scrollTo(0, 0);
				},
				(error) => {
					console.error(error);
					alert("Invalid information");
				}
			);
		}
	};

	return (
		<div className="profile">
			<div className="required">
				<LabelNavbar label={"REQUIRED"} />
				<div className="content-below-nav">
					<div className="photo-form">
						<img alt="user" src={profilePicture}></img>
						<button onClick={() => fileInput.current.click()}>
							CHANGE PHOTO
						</button>
						<input
							ref={fileInput}
							style={{ display: "none" }}
							type="file"
							onChange={changeProfilePicture}
						/>
					</div>
					<div className="req-form">
						<label>First Name</label>
						<input
							type="text"
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
						></input>
						<label>Last Name</label>
						<input
							type="text"
							value={userSurname}
							onChange={(e) => {
								setUserSurname(e.target.value);
							}}
						></input>
						<label>I am</label>
						<select>
							<option value="Male" onChange={(e) => setUserSex(e.target.value)}>
								Male
							</option>
							<option
								value="Female"
								onChange={(e) => setUserSex(e.target.value)}
							>
								Female
							</option>
						</select>
						<label>Date of Birth</label>
						<div className="birth-from">
							<select id="month-drop-menu">
								{months.length !== 0
									? months.map((month) => (
											<option key={month} value={month}>
												{month}
											</option>
									  ))
									: null}
							</select>
							<select
								id="day-drop-menu"
								onChange={(e) => setUserDay(e.target.value)}
							>
								{days.length !== 0
									? days.map((day) => (
											<option
												key={day}
												value={day < 9 ? "0" + day.toString() : day}
											>
												{day}
											</option>
									  ))
									: null}
							</select>
							<select
								value={userYear}
								onChange={(e) => setUserYear(e.target.value)}
							>
								{years.length !== 0
									? years.map((yr) => <option key={yr}>{yr}</option>)
									: null}
							</select>
						</div>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								aria-describedby="basic-addon2"
								value={userPhone}
								onChange={(e) => {
									setUserPhone(e.target.value);
								}}
								placeholder="e.g. 555-555-555"
							/>
							<div className="input-group-append">
								<span className="input-group-text" id="basic-addon2">
									Verified
								</span>
							</div>
						</div>
						<label>Email Address</label>
						<input
							type="email"
							value={userEmail}
							onChange={(e) => {
								setUserEmail(e.target.value);
							}}
						></input>
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
			<button className="save-info-btn" onClick={saveChanges}>
				SAVE INFO <RiArrowRightSLine />
			</button>
		</div>
	);
}

export default Profile;
