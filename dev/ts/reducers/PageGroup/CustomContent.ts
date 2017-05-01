import {Action, CustomContentLoaded} from "../../actions/Actions";
import {loadJson} from "../../misc/MiscUtils";
export interface CustomContent {
	name: string;
	content: string;
	created_by: string;
}

export default function (state: CustomContent = null, action: Action<any>): CustomContent {
	if(action.type === CustomContentLoaded) {
		return action.data;
	}
	if(!state) {
		loadJson("json/customContent.json", CustomContentLoaded);
		return {
			name: "",
			content: "",
			created_by: ""
		}
	}
	return state;
}