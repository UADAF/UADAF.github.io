import * as React from "react";

export interface VkContactProps {
	name: string
	link: string
	logo: string
	desc: string
}

export default class VkContact extends React.Component<VkContactProps, {}> {

	render() {
		let link = `https://vk.com/${this.props.link}`;
		let logo = `images/vk/${this.props.logo}`;
		return (
			<div className="col-md-3 col-centered vk_contact">
				<a className="vk_link" href={link} target="_blank">
					<img className="vk_logo img-responsive center-block" src={logo}/>
					<div className="vk_name">
						{this.props.name}
					</div>
				</a>
				<hr className="vk_hr"/>
				<div className="vk_desc">
					{this.props.desc}
				</div>
			</div>
		)
	}

}