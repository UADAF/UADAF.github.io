import * as React from "react";
import {getCustomContent, CustomContent} from "../../misc/MiscUtils";

export default class CustomContentPage extends React.Component<{}, {}> {
	render() {
		let content: CustomContent = getCustomContent();
		if(content.content.indexOf("<script>") > -1) {
			return React.createElement("div", null, "Custom content can't contain <script> tag");
		}
		return (
			<div className="container" id="custom_content">
				<h1 className="name">{name}</h1>
				<div className="content" dangerouslySetInnerHTML={{__html: content.content}}/>
			</div>
		)
	}
}

