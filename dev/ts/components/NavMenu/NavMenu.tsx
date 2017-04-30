import * as React from "react";
import {PageProps} from "../../reducers/PageList";
import NavItem from "./NavItem";
import {connect} from "react-redux";

interface NavMenuProps
{
	left: PageProps[];
	right: PageProps[]
}
class NavMenu extends React.Component<NavMenuProps, {}> {
	render() {
		return (
			<nav className="site_menu navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<span className="navbar-brand logo-text" href="index.html"><img style={{
							display: "inline-block",
							width: "30px",
							height: "30px",
							marginRight: "4px"
						}} id="logo_image" src="images/gear.png"/>Unified Anti Divine Astral Front</span>
					</div>
					<ul className="nav navbar-nav">
						{NavMenu.mapNaveBar(this.props.left)}
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{NavMenu.mapNaveBar(this.props.right)}
					</ul>
				</div>
			</nav>
		)
	}

	static mapNaveBar(pages: PageProps[]) {
		return pages.map((e: PageProps, i: number) => <NavItem key={i} href={e.href} glyph={e.glyph} windowName={e.windowName}/>);
	}
}

function stateToProps(state):NavMenuProps
{
	return {
		left: state.pages.left,
		right: state.pages.right
	};
}

export default connect(stateToProps)(NavMenu);