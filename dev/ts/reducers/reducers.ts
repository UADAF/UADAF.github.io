import {Reducer, combineReducers} from "redux";
import PageList from "./PageList";
import NamedPageList from "./NamedPageList";
import CurrentPage from "./CurrentPage";
import VkLinks from "./VkLinks";
import FAQuestions from "./FAQuestions"
import ITHState from "./ITHState";
export interface Reducers {
	pages: typeof PageList;
	namedPages: typeof NamedPageList;
	curPage: typeof CurrentPage;
	vkLinks: typeof VkLinks;
	question: typeof FAQuestions;
	ithState: typeof ITHState;
}
const reduces: Reducer<Reducers> = combineReducers<Reducers>({
	pages: PageList,
	namedPages: NamedPageList,
	curPage: CurrentPage,
	vkLinks: VkLinks,
	question: FAQuestions,
	ithState: ITHState
});

export default reduces;