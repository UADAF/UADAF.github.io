import * as React from "react";
import {Action} from "../../actions/Actions";
import ITHLogin from "../../actions/ITHLogin";
import ITHStoryChanged from "../../actions/ITHStoryChanged";
import {connect} from "react-redux";
import * as $ from "jquery";


interface ITHLoginProps {
	msg: string;
	color: string;
}

interface ITHLoginActions {
	login: (string) => Action;
}

interface ITHStoryProps {
	user: string;
	story: number;
}

interface ITHStoryActions {
	changeStory: (number) => Action;
}

type ITHCombinedProps = ITHLoginProps & ITHStoryProps & {isLogged: boolean};
type ITHCombinedActions = ITHLoginActions & ITHStoryActions;

class ITHPage extends React.Component<ITHCombinedProps & ITHCombinedActions, {}> {

	render() {
		console.log(this.props.isLogged);
		return this.props.isLogged ? this.createStory() : this.createLogin();
	}

	createLogin() {
		return (
			<div className="container login" id="ith_login">
				<div className="row text-center">
					<div className="frame">
						<input type="login" id="login" placeholder="Login..."/>
						<input type="submit" onClick={() => this.props.login($("#login").val())} value="Войти"/>
						<div className="login_msg" style={{color: this.props.color}}>
							{this.props.msg}
						</div>
					</div>
				</div>
			</div>
		)
	}

	createStory() {
		let story: Story = getStory(this.props.story);
		return (
			<div className="container" id="ith_quotes">
				<div className="row">
					<div className="frame">
						<p className="user_data"> User: {this.props.user}</p>
						<a className="ith_title" href={`http://ithappens.me/story/${this.props.story}`} dangerouslySetInnerHTML={{__html: `${this.props.story}:${story.name}`}}/>
						<div className="ith_quote" dangerouslySetInnerHTML={{__html: story.content}}/>
						<button className="control-btn control-btn-left" onClick={() => this.props.changeStory(-1)}>
							<span>{"<<- Туда"}</span></button>
						<button className="control-btn control-btn-right" onClick={() => this.props.changeStory(1)}>
							<span>{"Сюда ->>"}</span></button>
					</div>
				</div>
			</div>
		)
	}
}

interface Story {
	name: string;
	content: string;
}

function getStory(id: number): Story {
	let html: string = $.ajax({
		url: `http://ithappens.me/story/${id}`,
		method: "GET",
		crossDomain: true,
		async: false
	}).responseText;
	let story = $(".story", $(html));
	let text = story.find(".text");
	let name = $("h1", story);
	text.find("a").each((i, e) => {
		let jqe = $(e);
		jqe.attr("href", `http://ithappens.me${jqe.attr("href")}`);
		jqe.attr("target", "_blank")
	});
	//Just for safety
	text.find("script").each((i, e) => {
		e.innerHTML = "";
	});
	name.find("script").each((i, e) => {
		e.innerHTML = "";
	});

	return {
		name: name.html(),
		content: text.html()
	};
}

export default connect<ITHCombinedProps, ITHCombinedActions, {}>(state => state.ithState, {
	login: ITHLogin,
	changeStory: ITHStoryChanged
})(ITHPage);