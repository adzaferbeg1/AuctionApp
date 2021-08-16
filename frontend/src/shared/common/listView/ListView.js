import React from "react";
import { ImHammer2 } from "react-icons/im";
import "./ListView.scss";

export const ListView = ({
	name,
	startPrice,
	onClick,
	imgUrl,
	description,
}) => {
	return (
		<div className="list-view">
			<div className="card" onClick={onClick}>
				<div className="card-body">
					<img className="list-item-img" src={imgUrl} alt={name}></img>
					<h5 className="card-title">{name}</h5>
					<p className="card-desc">{description}</p>
					<p className="card-text">Start From ${startPrice}</p>
					<button>
						Bid <ImHammer2 />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ListView;
