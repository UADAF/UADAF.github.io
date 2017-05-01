import * as React from "react";
import {Action, createActionCreator, ITHLogin, ITHStoryChanged} from "../../actions/Actions";
import {connect, ActionCreator} from "react-redux";
import * as $ from "jquery";


interface ITHLoginProps {
	msg: string;
	color: string;
}

interface ITHLoginActions {
	login: ActionCreator<string>;
}

interface ITHStoryProps {
	user: string;
	story: number;
}

interface ITHStoryActions {
	changeStory: ActionCreator<number>;
}

type ITHCombinedProps = ITHLoginProps & ITHStoryProps & {isLogged: boolean};
type ITHCombinedActions = ITHLoginActions & ITHStoryActions;

class ITHPage extends React.Component<ITHCombinedProps & ITHCombinedActions, {}> {

	render() {
		return this.props.isLogged ? this.createStory() : this.createLogin();
	}

	createLogin() {
		return (
			<div className="container login" id="ith_login">
				<div className="row text-center">
					<div className="frame">
						<input type="login" id="login" placeholder="Login..."/>
						<input type="submit" id="submit" onClick={() => this.props.login({status: "send", name: $("#login").val()})}
							   value="Войти"/>
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
						<div className="user_data"> User: {this.props.user}</div>
						<div className="ith_title"> <a href={`http://ithappens.me/story/${this.props.story}`}
											 dangerouslySetInnerHTML={{__html: `${this.props.story}:${story.name}`}}/> </div>
						<div className="ith_quote" dangerouslySetInnerHTML={{__html: story.content}}/>
						<button className="control-btn-left" onClick={() => this.props.changeStory(-1)}>
							<span>{"<<- Туда"}</span></button>
						<button className="control-btn-right" onClick={() => this.props.changeStory(1)}>
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
		let href: string = jqe.attr("href");
		if (href.indexOf("/") == 0) {//Slash as first symbol
			jqe.attr("href", `http://ithappens.me${href}`);
		}
		jqe.attr("target", "_blank")
	});
	//Just for safety
	text.find("script").html("");
	name.find("script").html("");
	return {
		name: name.html(),
		content: text.html()
	};
}

export default connect<ITHCombinedProps, ITHCombinedActions, {}>(state => state.ithState, {
	login: createActionCreator<{status: string, name: string}>(ITHLogin),
	changeStory: createActionCreator<number>(ITHStoryChanged)
})(ITHPage);