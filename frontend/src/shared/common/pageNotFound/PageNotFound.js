import { useHistory } from "react-router";
import "./PageNotFound.scss";

export default function PageNotFound() {
	const history = useHistory();

	return (
		<div className="pg-not-found">
			<img alt="logo" src="images/auction_logo.PNG" />
			<p className="error-code">404</p>
			<p>Oops! Looks like the page is Not Found</p>
			<button onClick={() => history.push("/")}>Go back</button>
		</div>
	);
}
