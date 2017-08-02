import * as React from "react";
import {connect} from "react-redux";
export interface DiscordProps {
	invite: string;
}
class DiscordConnect extends React.Component<DiscordProps> {

	render() {
		const invite: string = this.props.invite;
		if(!invite) {
			return <span/>;
		}
		return (
			<div className="discord_connect">
				<a className="connect_link" href={this.props.invite} target="_blank">
					<div>
						<img className="discord_logo img-responsive" src="/images/discord/discordface.png"/>
						Connect to discord
					</div>
				</a>
			</div>
		)
	}
}

export default connect<DiscordProps, {}, {}>(state => {return {invite: state.discordInvite}})(DiscordConnect);