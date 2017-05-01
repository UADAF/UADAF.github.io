import * as React from "react";
import {connect, ActionCreator} from "react-redux";
import {Action, PageChanged, createActionCreator} from "../../actions/Actions";
export interface NavItemCreateProps {
	href: string;
	glyph: string;
	windowName: string;
}

interface NavItemProps {
	active: boolean;

}

interface NavItemActions {
	changePage: ActionCreator<string>;
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

export default connect<NavItemProps, NavItemActions, NavItemCreateProps>((state, props: NavItemCreateProps) => {
	return {active: props.href === state.pages.current}
}, {changePage: createActionCreator<string>(PageChanged)})(NavItem);
