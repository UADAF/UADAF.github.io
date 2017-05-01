import {Action} from "../../actions/Actions";
import {CustomContent, default as CustomContentR} from "./CustomContent";
import {PageList, default as PageListR} from "./PageList";
import CurrentPageR from "./CurrentPage";
import {NamedPageList, default as NamedPageListR} from "./NamedPageList";

export interface Pages {
	customContent: CustomContent;
	list: PageList;
	current: string;
	namedPages: NamedPageList;
}

export default function (state: Pages = {
	customContent: null,
	list: null,
	current: localStorage.getItem("lastPage"),
	namedPages: null
}, action: Action<any>): Pages {
	let customContent = CustomContentR(state.customContent, action);
	let list = PageListR(state.list, action, customContent);
	let current = CurrentPageR(state.current, action);
	let namedPages = NamedPageListR(list);
	return {customContent, list, current, namedPages};
}