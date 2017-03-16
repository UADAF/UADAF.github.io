import * as React from "react";
import {getCustomContent, CustomContent} from "../../misc/MiscUtils";

export default class CustomContentPage extends React.Component<{}, {}> {
	render() {
		let content: CustomContent = getCustomContent();
		if(content.content.indexOf("<script>") > -1) {
			return React.createElement("div", null, "Custom content can't contain <script> tag");
		}
		return (
			<div className="container">
				<div className="frame">
					<div className="cc_name text-center">
						{content.name}
					</div>
					<div className="cc_content" dangerouslySetInnerHTML={{__html: content.content}} />
					<div className="cc_created_by">
						Created By : {content.created_by}
					</div>
				</div>
			</div>
		)
	}
}

