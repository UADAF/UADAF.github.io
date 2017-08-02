import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator, createActionCreator, Register} from "../../actions/Actions";
import {RegisterProps, StatedProp} from "../../reducers/UserState";


export interface RegisterPageProps {
	msg: string;
	color: string;
}

export interface RegisterPageActions {
	register: ActionCreator<StatedProp<RegisterProps>>;
}

class RegisterPage extends React.Component<RegisterPageProps & RegisterPageActions> {
	render() {
		return (
			<div className="container reg-frame">
				<div className="row">
					<p className="reg-title text-left">Регистрация:
						<span id="reg-output" style={{color: this.props.color}}>{this.props.msg}</span>
					</p>
				</div>
				<div className="row reg-input-frame">
					<input type="text" className="inp inp-half" name="username" id="username"
						   placeholder="Username... "/>
					<input type="text" className="inp inp-half" name="wf_username" id="wf_username"
						   placeholder="Warframe username... "/>
					<br />
					<input type="email" className="inp inp-full" name="email" id="email" placeholder="E-Mail..."/>
					<br />
					<input type="password" className="inp inp-half" name="password" id="password"
						   placeholder="Password ..."/>
					<input type="password" className="inp inp-half" name="repassword" id="repassword"
						   placeholder="Validate password..."/>
					<br />
					<button onClick={() => this.props.register({
						state: 'request',
						data: {
							username: $("#username").val(),
							wf_username: $("#wf_username").val(),
							email: $("#email").val(),
							password: $("#password").val(),
							repassword: $("#repassword").val()
						}
					})} id="register" className="btn btn-reg inp-full">Зарегестрироваться
					</button>
				</div>
			</div>
		)
	}
}


export default connect<RegisterPageProps, RegisterPageActions, {}>(state => {
	let user = state.user;
	return {
		color: user.color,
		msg: user.customMsg
	};
}, {
	register: createActionCreator(Register)
})(RegisterPage);