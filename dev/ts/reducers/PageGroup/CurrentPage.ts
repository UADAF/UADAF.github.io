import {Action} from "../../actions/Actions";
import {PageChanged} from "../../actions/Actions";
export default function (state: string = localStorage.getItem("lastPage"), action: Action<any>): string {
	if (state === null || parseInt(localStorage.getItem("lastPageTimestamp")) < new Date().getTime()) {
		state = "main";
	}
	switch (action.type) {
		case PageChanged: {
			state = action.data;
			break;
		}
	}
	localStorage.setItem("lastPage", state);
	let date: Date = new Date();
	date.setHours(date.getHours() + 24);//One day later
	localStorage.setItem("lastPageTimestamp", date.getTime() + "");
	return state;
}