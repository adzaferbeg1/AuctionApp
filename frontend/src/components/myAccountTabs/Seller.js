import React from "react";
import { Table } from "react-bootstrap";

const Seller = () => {
	return (
		<div className="sellers">
			<Table variant="gray-transparent" responsive>
				<thead>
					<tr className="product-table-header">
						<th>Item</th>
						<th colSpan="2">Name</th>
						<th>Time Left</th>
						<th>Your Price</th>
						<th>No. bids</th>
						<th>Highest Bid</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default Seller;
