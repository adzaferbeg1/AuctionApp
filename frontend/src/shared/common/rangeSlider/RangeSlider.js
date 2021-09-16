import { useEffect, useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "shared/common/rangeSlider/RangeSlider.scss";

const RangeSlider = ({ minValue, maxValue, setMinMaxPrice }) => {
	const [min, setMin] = useState();
	const [max, setMax] = useState();

	useEffect(() => {
		setMin(minValue);
		setMax(maxValue);
	}, [minValue, maxValue]);

	return (
		<div className="min-max-range">
			<Range
				className="range-slider"
				min={Math.floor(minValue)}
				max={Math.ceil(maxValue)}
				allowCross={false}
				step="1"
				value={[min, max]}
				onChange={(prices) => {
					setMin(prices[0]);
					setMax(prices[1]);
					setMinMaxPrice(prices[0], prices[1]);
				}}
			/>
		</div>
	);
};

export default RangeSlider;
