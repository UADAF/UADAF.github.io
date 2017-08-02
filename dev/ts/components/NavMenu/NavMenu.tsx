import * as React from "react";
import {PageProps, PageList} from "../../reducers/PageGroup/PageList";
import NavItem from "./NavItem";
import {connect} from "react-redux";

class NavMenu extends React.Component<PageList> {
	render() {
		return (
			<nav className="site_menu navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<span className="navbar-brand logo-text"><img style={{
							display: "inline-block",
							width: "30px",
							height: "30px",
							marginRight: "4px"
						}} id="logo_image" src="/images/gear.png" onClick={() => {
							$("#logo_image").css("animation-name", "logo_anim");
							setTimeout(() => $("#logo_image").css("animation-name", ""), 3000);
						}}/>Unified Anti Divine Astral Front</span>
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
		return pages.map((e: PageProps, i: number) => <NavItem key={i} href={e.href} glyph={e.glyph}
															   windowName={e.windowName}/>);
	}
}

export default connect(state => {
	return {
		left: state.pages.list.left,
		right: state.pages.list.right
	}
})(NavMenu);