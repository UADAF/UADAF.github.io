import * as React from "react";
import {CustomContent} from "../../reducers/PageGroup/CustomContent";
import {connect} from "react-redux";

interface CustomContentPageProps {
	content: CustomContent;
}

class CustomContentPage extends React.Component<CustomContentPageProps> {
	render() {
		let content: CustomContent = this.props.content;
		if(content.content.indexOf("<script>") > -1) {
			content.content = "Custom content can't contain &lt;script&gt; tag";
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

export default connect<CustomContentPageProps, {}, {}>(state => {return {content: state.pages.customContent}})(CustomContentPage);