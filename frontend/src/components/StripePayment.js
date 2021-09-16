import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "pages/payment/Payment";

const PUBLIC_KEY =
	"pk_test_51JXPtmFSFGo8BUEk4nOp31ndpU75p7MM0XY9VZ3640IG3Ad2YpQkuY76TzCY84azgIbuK5dCAht6PzxYNilNKSpn00OqGE3KpF";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripePayment(props) {
	return (
		<Elements stripe={stripeTestPromise}>
			<Payment closedItem={props.location.state.item} />
		</Elements>
	);
}
