import * as React from "react";
import {createActionCreator, ITHLogin, ITHStoryChanged} from "../../actions/Actions";
import {connect, ActionCreator} from "react-redux";
import {ITHState} from "../../reducers/ITHState"
import * as $ from "jquery";


interface ITHLoginProps {
	msg: string;
	color: string;
}

interface ITHLoginActions {
	login: ActionCreator<string>;
}

interface ITHStoryActions {
	changeStory: ActionCreator<number>;
}

type ITHCombinedProps = ITHLoginProps & ITHState & {isLogged: boolean};
type ITHCombinedActions = ITHLoginActions & ITHStoryActions;

class ITHPage extends React.Component<ITHCombinedProps & ITHCombinedActions> {

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
		return (
			<div className="container" id="ith_quotes">
				<div className="row">
					<div className="frame">
						<div className="user_data"> User: {this.props.user}</div>
						<div className="ith_title"> <a href={`http://ithappens.me/story/${this.props.story}`}
											 dangerouslySetInnerHTML={{__html: `${this.props.story}:${this.props.storyName}`}}/> </div>
						<div className="ith_quote" dangerouslySetInnerHTML={{__html: this.props.storyContent}}/>
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

export default connect<ITHCombinedProps, ITHCombinedActions, {}>(state => state.ithState, {
	login: createActionCreator<{status: string, name: string}>(ITHLogin),
	changeStory: createActionCreator<number>(ITHStoryChanged)
})(ITHPage);