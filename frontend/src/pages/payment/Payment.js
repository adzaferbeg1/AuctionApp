import { useEffect, useState } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import {
	IoIosArrowBack,
	IoIosArrowForward,
	IoMdCard,
	IoIosHome,
} from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useUserContext } from "../../AppContext";
import { LabelNavbar } from "../../shared/common/index";
import StripeService from "../../services/StripeService";
import "./Payment.scss";
import { Link } from "react-router-dom";

export default function Payment({ closedItem }) {
	const [showCardInfo, setShowCardInfo] = useState(false);
	const [showAddressInfo, setShowAddressInfo] = useState(true);
	const [item, setItem] = useState([]);
	const { user } = useUserContext();
	const [userStreet, setUserStreet] = useState();
	const [userCity, setUserCity] = useState();
	const [userZip, setUserZip] = useState();
	const [userState, setUserState] = useState();
	const [userCountry, setUserCountry] = useState();
	const [userName, setUserName] = useState();
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		setItem(closedItem);
		setUserName(user.name + " " + user.surname);
		if (user.address !== null) {
			const addressArray = user.address.split("//");
			setUserStreet(addressArray[0]);
			setUserCity(addressArray[1]);
			setUserZip(addressArray[2]);
			setUserState(addressArray[3]);
			setUserCountry(addressArray[4]);
		}
	}, [user, closedItem]);

	const handleSumbit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
			billing_details: {
				email: user.email,
				name: userName,
				address: {
					city: userCity,
					state: userState,
				},
			},
		});

		if (!error) {
			try {
				const { id } = paymentMethod;
				const response = await StripeService.processCardPayment(
					item.currentPrice * 100,
					id
				);
				if (response.status === 200) {
					setSuccess(true);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error(error.message);
		}
	};

	return (
		<>
			<LabelNavbar label={"PAYMENT INFORMATION"} />
			<div className="payment-tab">
				<div className="payment-card">
					{showAddressInfo ? (
						<>
							<div className="payment-tab-div">
								<label>
									{" "}
									<IoIosHome /> Insert your address
								</label>
							</div>
							<div className="card-inputs">
								<h5 style={{ color: "#8367d8", marginBottom: "2em" }}>
									You are the highest bidder, {user.name}! Congrats!
								</h5>
								<label>Street</label>
								<input
									type="text"
									placeholder="e.g. 45th Green Lane"
									value={userStreet}
									onChange={(e) => setUserStreet(e.target.value)}
								/>
								<div className="zip-label">
									<label>City</label>
									<label>Zip Code</label>
								</div>
								<div className="zip-input">
									<input
										type="text"
										placeholder="e.g. New York"
										value={userCity}
										onChange={(e) => setUserCity(e.target.value)}
									/>
									<input
										type="text"
										placeholder="e.g. 10065"
										value={userZip}
										onChange={(e) => setUserZip(e.target.value)}
									/>
								</div>
								<label>State</label>
								<input
									type="text"
									placeholder="e.g. New York"
									value={userState}
									onChange={(e) => setUserState(e.target.value)}
								/>
								<label>Country</label>
								<input
									type="text"
									placeholder="e.g. USA"
									value={userCountry}
									onChange={(e) => setUserCountry(e.target.value)}
								/>
								<button
									className="next-btn"
									onClick={() => {
										setShowAddressInfo(false);
										setShowCardInfo(true);
									}}
								>
									Next <IoIosArrowForward />
								</button>
							</div>{" "}
						</>
					) : null}
					{showCardInfo ? (
						<>
							<div className="payment-tab-div">
								<label>
									<IoMdCard /> Insert card info
								</label>
							</div>
							<div className="card-inputs">
								<label>Card Holder</label>
								<input
									type="text"
									placeholder="e.g. Adam Smith"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
								<label>Card Information</label>
								<CardElement />
								<button
									className="back-btn"
									onClick={() => {
										setShowAddressInfo(true);
										setShowCardInfo(false);
									}}
								>
									<IoIosArrowBack /> Back
								</button>
								<button
									className="pay-btn"
									onClick={handleSumbit}
									disabled={success}
								>
									Pay ${item.currentPrice}
								</button>
							</div>
						</>
					) : null}
					{success ? (
						<div className="success-payment">
							<TiTick /> Pruchase successful. Continue
							<Link to="/"> bidding</Link>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}
