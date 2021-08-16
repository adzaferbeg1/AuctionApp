import React from "react";
import { ImHammer2 } from "react-icons/im";

const GridView = ({ name, startPrice, onClick, imgUrl }) => {
	return (
		<>
			<div className="single-card card" onClick={onClick}>
				<div className="card-body">
					<img className="grid-item-img" src={imgUrl} alt={name}></img>
					<h5 className="card-title">{name}</h5>
					<p className="card-text">Start From ${startPrice}</p>
					<button>
						Bid <ImHammer2 />
					</button>
				</div>
			</div>
		</>
	);
};

export default GridView;
