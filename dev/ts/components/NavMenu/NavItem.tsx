import * as React from "react";
import PageChanged from "../../actions/PageChanged";
import {connect} from "react-redux";
export interface NavItemCreateProps {
	href: string;
	glyph: string;
	windowName: string;
}

interface NavItemProps {
	active: boolean;

}

interface NavItemActions {
	changePage: Function;
}

class NavItem extends React.Component<NavItemCreateProps & NavItemProps & NavItemActions, {}> {
	render() {
		let listClass = this.props.active ? "active" : "";
		return (
			<li className={listClass}>
				<a href="#" className="menu_unit" onClick={() => this.props.changePage(this.props.href)}>
					<span className={"glyphicon glyphicon-" + this.props.glyph}/>
					{this.props.windowName}
				</a>
			</li>
		);
	}
}
function stateToProps(state, props: NavItemCreateProps): NavItemProps {
	return {
		active: props.href === state.curPage,
	};
}

export default connect<NavItemProps, NavItemActions, NavItemCreateProps>(stateToProps, {changePage: PageChanged})(NavItem);
