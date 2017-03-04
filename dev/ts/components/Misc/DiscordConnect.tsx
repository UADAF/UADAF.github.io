import * as React from "react";

export default class DiscordConnect extends React.Component<{}, {}> {

	render() {
		return (
			<div className="discord_connect">
				<a className="connect_link"
				   href="https://discord.gg/Mmzakpx"
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