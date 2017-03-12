import * as React from "react";
import {connect} from "react-redux";
import {Action, PageChanged} from "../../actions/Actions";
export interface NavItemCreateProps {
	href: string;
	glyph: string;
	windowName: string;
}

interface NavItemProps {
	active: boolean;

}

interface NavItemActions {
	changePage: (string) => Action;
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

export default connect<NavItemProps, NavItemActions, NavItemCreateProps>(stateToProps, {changePage: page => {return {type: PageChanged, data: page}}})(NavItem);
