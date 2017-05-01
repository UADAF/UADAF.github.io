import {HelpQuestionProps} from "../components/Misc/HelpQuestion";
import {loadJson} from "../misc/MiscUtils";
import {FAQLoaded, Action} from "../actions/Actions";
export default function (state: HelpQuestionProps[] = null, action: Action<any>): HelpQuestionProps[] {
	if (action && action.type === FAQLoaded) {
		return action.data;
	}
	if (state) {
		return state;
	} else {
		loadJson("json/faq.json", FAQLoaded);
		return [];
	}
}