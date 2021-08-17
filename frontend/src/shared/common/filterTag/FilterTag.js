import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import "./FilterTag.scss";

const FilterTag = ({ label, onClick }) => {
	return (
		<>
			<div className="filter-tag" id={label + "tag"}>
				<p>
					{label} <TiDeleteOutline onClick={onClick} />
				</p>
			</div>
		</>
	);
};

export default FilterTag;
