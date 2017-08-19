import {createAction, Action, ITHLogin, ITHStoryChanged, ITHStoryLoaded} from "../actions/Actions";
import {ajax} from "jquery";
import {store, backendExt} from "../index";

export interface ITHState {
	isLogged: boolean;
	user: string;
	story: number;
	storyContent: string;
	storyName: string;
}

const defaultState: ITHState = {
	isLogged: false,
	user: "NONE",
	story: 1,
	storyContent: "UNLOGGED",
	storyName: "UNLOGGED"
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
						if(typeof action.data.state.story !== "number") {
							action.data.state.story = parseInt(action.data.state.story);
						}
						getStory(action.data.state.story);
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
				getStory(story);
				return state;
			}
			case ITHStoryLoaded: {
				return {
					isLogged: state.isLogged,
					user: state.user,
					story: action.data.num,
					storyContent: action.data.content,
					storyName: action.data.name
				}
			}
		}

	}
	if (!state && typeof store != "undefined") {
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
	story: 1,
	storyContent: "UNLOGGED",
	storyName: "UNLOGGED"
};
let isLoginInProgress = false;
function verifyName(name: string) {
	if (name === "") {
		return emptyNameState;
	}
	if(!isLoginInProgress) {
		isLoginInProgress = true;
		localStorage.setItem("ITH_last_login", name);
		connectToDB({task: "login", name: name}, true, (data) => {
			store.dispatch(createAction(ITHLogin, {
				status: "receive",
				state: JSON.parse(data)
			}));
			isLoginInProgress = false;
		});
	}

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

function getStory(id: number): void {
	$.ajax({
		url: `http://ithappens.me/story/${id}`,
		method: "GET",
		crossDomain: true,
		async: false
	}).then(html => {
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
		store.dispatch(createAction(ITHStoryLoaded, {
			name: name.html(),
			content: text.html(),
			num: id
		}));
	});
}