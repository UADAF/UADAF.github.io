﻿import * as React from "react";
import {PageProps, PageList} from "../../reducers/PageGroup/PageList";
import NavItem from "./NavItem";
import {connect} from "react-redux";
import {createsoundbite} from "../../misc/MiscUtils"
class NavMenu extends React.Component<PageList> {

	player = createsoundbite('audio/S.ogg', 'audio/S.mp3');

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
							let logo = $("#logo_image");
							logo.css("animation-name", "logo_anim");

							setTimeout(() => this.player.playclip(), 500);
							setTimeout(() => logo.css("animation-name", ""), 3000);
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
		return pages.map((e: PageProps, i: number) => <NavItem key={i} {...e}/>);
	}
}

export default connect(state => {
	return {
		left: state.pages.list.left,
		right: state.pages.list.right
	}
})(NavMenu);