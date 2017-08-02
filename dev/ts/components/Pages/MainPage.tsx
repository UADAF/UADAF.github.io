import * as React from "react";
import {connect} from "react-redux"
import {VkContactProps, default as VkContact} from "../Vk/VkContact";
import DiscordConnect from "../Misc/DiscordConnect";
export interface MainPageProps {
	vkLinks: VkContactProps[]
}

class MainPage extends React.Component<MainPageProps> {

	render() {
		return (
			<div className="container">
				<div className="row">
					<p className="help_title text-center">Если у вас что-то не получается, сверху есть кнопочка <strong>Помощь</strong>.</p>
				</div>
				<div className="row">
					<DiscordConnect />
				</div>
				<div className="row widget text-center">
					{this.props.vkLinks.map((e, i) => <VkContact key={i} {...e}/>)}
				</div>
			</div>
		)
	}
}

export default connect<MainPageProps, {}, {}>(state => {
	return {vkLinks: state.vkLinks}
})(MainPage);