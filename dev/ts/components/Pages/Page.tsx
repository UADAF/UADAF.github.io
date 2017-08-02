import * as React from "react";
import {connect} from "react-redux";
import NavMenu from "../NavMenu/NavMenu";
export interface PageProps {
	currentPage: typeof React.Component;
}
class Page extends React.Component<PageProps> {
	render() {
		return (
			<div>
				<NavMenu />
				<section id="page">
					{React.createElement(this.props.currentPage, null)}
				</section>
			</div>
		);
	}
}

function stateToProps(state): PageProps {
	let pages = state.pages;
	let namedPages = pages.namedPages;
	let page = namedPages[pages.current];
	if(!page) {
		page = namedPages["main"];
	}
	return {currentPage: page.clazz};
}

export default connect(stateToProps)(Page);