import React from "react";

import { LabelNavbar } from "shared/common";
import { privacyAndTerms } from "shared/styles/PageStyles";

export default function Terms() {
	window.scrollTo(0, 0);
	return (
		<>
			<LabelNavbar label={"TERMS AND CONDITIONS"} />
			<div style={privacyAndTerms}>
				<h1>Introduction</h1>
				<br />
				<p>
					These Website Standard Terms and Conditions written on this webpage
					shall manage your use of our website, auction.com accessible at
					www.auction.com. These Terms will be applied fully and affect to your
					use of this Website. By using this Website, you agreed to accept all
					terms and conditions written in here. You must not use this Website if
					you disagree with any of these Website Standard Terms and Conditions.
					These Terms and Conditions have been generated with the help of the
					Terms And Conditiions Sample Generator. Minors or people below 18
					years old are not allowed to use this Website.
				</p>
				<br />
				<h4>Intellectual Property Rights</h4>
				<p>
					Other than the content you own, under these Terms, AUCTION and/or its
					licensors own all the intellectual property rights and materials
					contained in this Website. You are granted limited license only for
					purposes of viewing the material contained on this Website.
				</p>
				<br />
				<h4>Your Content</h4>
				<p>
					In these Website Standard Terms and Conditions, "Your Content" shall
					mean any audio, video text, images or other material you choose to
					display on this Website. By displaying Your Content, you grant AUCTION
					a non-exclusive, worldwide irrevocable, sub licensable license to use,
					reproduce, adapt, publish, translate and distribute it in any and all
					media. Your Content must be your own and must not be invading any
					third-party’s rights. AUCTION reserves the right to remove any of Your
					Content from this Website at any time without notice.
				</p>
			</div>
		</>
	);
}
