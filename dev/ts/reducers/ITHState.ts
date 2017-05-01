import {createAction, Action, ITHLogin, ITHStoryChanged} from "../actions/Actions";
import {ajax} from "jquery";
import {store, backendExt} from "../index";
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
				switch (action.data.status) {
					case "send": {
						verifyName(action.data.name);
						break;
					}
					case "receive": {
						return action.data.state;
					}
				}
				break;
			}
			case ITHStoryChanged: {
				if (!state.isLogged) {
					return defaultState;
				}
				let story: number = state.story + action.data;
				if (story <= 0) {
					return state;
				}
				connectToDB({task: "setStory", name: state.user, story: story}, true);
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
			verifyName(lastLogin);
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
function verifyName(name: string) {
	if (name === "") {
		return emptyNameState;
	}
	localStorage.setItem("ITH_last_login", name);
	connectToDB({task: "login", name: name}, true, (data) => {
		store.dispatch(createAction(ITHLogin, {
			status: "receive",
			state: JSON.parse(data)
		}))
	});
}


function connectToDB(data: Object, async: boolean = false, cb: (data: any, textStatus: string, jqXHR: JQueryXHR) => any = null): string {
	return ajax({
		url: `backend/ITH${backendExt}`,
		method: "POST",
		data: data,
		async: async,
		success: cb
	}).responseText;
}