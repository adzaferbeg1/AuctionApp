import { useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "./RangeSlider.scss";

const RangeSlider = ({ minValue, maxValue, setMinMaxPrice }) => {
	const [min, setMin] = useState(minValue);
	const [max, setMax] = useState(maxValue);

	return (
		<div className="min-max-range">
			<Range
				className="range-slider"
				min={Math.floor(min)}
				max={Math.ceil(max)}
				allowCross={false}
				step="1"
				value={[min, max]}
				onChange={() => {
					setMin(min);
					setMax(max);
					setMinMaxPrice(min, max);
				}}
			/>
		</div>
	);
};

export default RangeSlider;
