import React from "react";
import { ImHammer2 } from "react-icons/im";
import { FiHeart } from "react-icons/fi";
import { useUserContext } from "AppContext";
import { addItemToWishlist } from "utils/WishlistUtil";

const GridView = ({ item, onClick }) => {
	const { loggedIn, user } = useUserContext();

	const addItem = () => {
		addItemToWishlist(loggedIn, user, item);
	};

	return (
		<>
			<div className="single-card card">
				<div className="card-body">
					<img
						className="grid-item-img"
						src={item.imgUrl}
						alt={item.name}
						onClick={onClick}
					></img>
					<h5 className="card-title">{item.name}</h5>
					<p className="card-text">Start From ${item.startPrice}</p>
					<div>
						<button onClick={addItem}>
							Watchlist <FiHeart />
						</button>
						<button onClick={onClick}>
							Bid <ImHammer2 />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default GridView;
