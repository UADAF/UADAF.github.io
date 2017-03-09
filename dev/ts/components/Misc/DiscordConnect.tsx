import * as React from "react";
import {ajax} from "jquery";
const invite = ajax({
	url: 'https://discordapp.com/api/guilds/197699632841752576/widget.json',
	async: false,
}).responseJSON['instant_invite'];
export default class DiscordConnect extends React.Component<{}, {}> {

	render() {
		return (
			<div className="discord_connect">
				<a className="connect_link"
				   href={invite}
				   target="_blank">
					<div>
						<img className="discord_logo img-responsive" src="images/discord/discordface.png"
							 alt="Discord logo"/>
						Connect to discord
					</div>
				</a>
			</div>
		)
	}

}