import * as React from "react";
import {connect} from "react-redux"
import {VkContactProps, default as VkContact} from "../Vk/VkContact";
import DiscordConnect from "../Misc/DiscordConnect";
export interface MainPageProps {
	vkLinks: VkContactProps[]
}

class MainPage extends React.Component<MainPageProps, {}> {

	render() {
		return (
			<div className="container">
				<div className="row">
					<DiscordConnect/>
				</div>
				<div className="row widget text-center">
					{this.props.vkLinks.map((e, i) => <VkContact key={i} {...e}/>)}
				</div>
			</div>
		)
	}

	createWidgets(): JSX.Element[] {
		let ret: JSX.Element[] = [];
		let vk: VkContactProps[] = this.props.vkLinks;
		let discord: JSX.Element = <iframe key={0} className="col-md-3 col-centered discord_widget"
										   src="https://discordapp.com/widget?id=197699632841752576&theme=dark"/>;
		if (vk.length % 2 == 0) {
			let half = vk.length / 2;
			this.mapArrToVk(vk, 0, half, ret);
			ret.push(discord);
			this.mapArrToVk(vk, half, vk.length, ret);
		} else {
			ret.push(discord);
			this.mapArrToVk(vk, 0, vk.length, ret);
		}
		return ret;
	}

	mapArrToVk(arr: VkContactProps[], from: number, to: number, target: JSX.Element[]): void {
		for (let i: number = from; i < to; i++) {
			target.push(<VkContact key={i + 1} {...arr[i]}/>)
		}
	}
}

export default connect<MainPageProps, {}, {}>(state => {
	return {vkLinks: state.vkLinks}
})(MainPage);