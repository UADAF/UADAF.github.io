import {Reducer, combineReducers} from "redux";
import {default as PageList, Pages} from "./PageList";
import NamedPageList from "./NamedPageList";
import CurrentPage from "./CurrentPage";
import VkLinks from "./VkLinks";
import FAQuestions from "./FAQuestions"
import {default as ITH, ITHState} from "./ITHState";
import {VkContactProps} from "../components/Vk/VkContact";
import {HelpQuestionProps} from "../components/Misc/HelpQuestion";
export interface Reducers {
	pages: Reducer<Pages>;
	namedPages: Reducer<string>;
	curPage: Reducer<string>;
	vkLinks: Reducer<VkContactProps[]>;
	question: Reducer<HelpQuestionProps[]>;
	ithState: Reducer<ITHState>;
}
const reduces: Reducer<Reducers> = combineReducers<Reducers>({
	pages: PageList,
	namedPages: NamedPageList,
	curPage: CurrentPage,
	vkLinks: VkLinks,
	question: FAQuestions,
	ithState: ITH
});

export default reduces;