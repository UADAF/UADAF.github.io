import {Action, ITHLogin, ITHStoryChanged} from "../actions/Actions";
import {ajax} from "jquery";
export interface ITHState {
	isLogged: boolean;
	user: string;
	msg: string;
	color: string;
	story: number;
}
const defaultState: ITHState = {
	isLogged: false,
	user: "NONE",
	msg: "",
	color: "#000",
	story: 1
};

export default function (state: ITHState = null, action: Action<any>): ITHState {
	if (action) {
		switch (action.type) {
			case ITHLogin: {
				return verifyName(action.data);
			}
			case ITHStoryChanged: {
				if (!state.isLogged) {
					return defaultState;
				}
				let story: number = state.story + action.data;
				if (story <= 0) {
					return state;
				}
				connectToDB({task: "setStory", name: state.user, story: story});
				//Otherwise redux thinks it is the same state
				return {
					isLogged: state.isLogged,
					user: state.user,
					msg: state.msg,
					color: state.color,
					story: story
				};
			}
		}

	}
	if (!state) {
		let lastLogin: string = localStorage.getItem("ITH_last_login");
		if (lastLogin) {
			return verifyName(lastLogin);
		} else {
			return defaultState;
		}
	}
	return state;
}
const emptyNameState: ITHState = {
	isLogged: false,
	user: "NONE",
	msg: "Name should not be empty",
	color: "red",
	story: 1
};
function verifyName(name: string): ITHState {
	if (name === "") {
		return emptyNameState;
	}
	localStorage.setItem("ITH_last_login", name);
	let state = JSON.parse(connectToDB({task: "login", name: name}));
	if (state.error) {
		return {
			isLogged: false,
			msg: state.erorr,
			color: "red",
			user: "NONE",
			story: 1
		}
	}
	state.story = parseInt(state.story);
	return state;
}


function connectToDB(data: Object): string {
	return ajax({
		url: "php/ITH.php",
		method: "POST",
		data: data,
		async: false
	}).responseText;
}