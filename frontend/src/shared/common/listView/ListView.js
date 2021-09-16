import React from "react";
import { ImHammer2 } from "react-icons/im";
import "shared/common/listView/ListView.scss";

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
					<div>
						<h5 className="card-title">{name}</h5>
						<p className="card-desc">{description}</p>
						<h5 className="card-text">Start From ${startPrice}</h5>
						<button>
							Bid <ImHammer2 />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListView;
