import React from "react";

const RelatedItemView = ({ name, startPrice, onClick, imgUrl }) => {
	return (
		<>
			<div className="card-element">
				<img alt="item" src={imgUrl} onClick={onClick} />
				<div className="details">
					<h3>{name}</h3>
					<h5>Start from ${startPrice}</h5>
				</div>
			</div>
		</>
	);
};

export default RelatedItemView;
