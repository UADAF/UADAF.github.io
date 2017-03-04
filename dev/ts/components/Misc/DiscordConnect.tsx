import * as React from "react";

export default class DiscordConnect extends React.Component<{}, {}> {

	render() {
		return (
			<div className="discord_connect">
				<a className="connect_link"
				   href="https://discordapp.com/invite/EA445?utm_source=Discord%20Widget&utm_medium=Connect"
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