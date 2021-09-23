import React from "react";
import { ImHammer2 } from "react-icons/im";
import { FiHeart } from "react-icons/fi";
import { useUserContext } from "AppContext";
import { addItemToWishlist } from "utils/WishlistUtil";
import "shared/common/listView/ListView.scss";

export const ListView = ({ item, onClick }) => {
	const { loggedIn, user } = useUserContext();

	const addItem = () => {
		addItemToWishlist(loggedIn, user, item);
	};

	return (
		<div className="list-view">
			<div className="card">
				<div className="card-body">
					<img
						className="list-item-img"
						src={item.imgUrl}
						alt={item.name}
					></img>
					<div>
						<h5 className="card-title">{item.name}</h5>
						<p className="card-desc">{item.description}</p>
						<h5 className="card-text">Start From ${item.startPrice}</h5>
					</div>
				</div>
				<div className="button-row">
					<button onClick={addItem}>
						Watchlist <FiHeart />
					</button>
					<button onClick={onClick}>
						Bid <ImHammer2 />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ListView;
