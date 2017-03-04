import {Reducer, combineReducers} from "redux";
import PageList from "./PageList";
import NamedPageList from "./NamedPageList";
import CurrentPage from "./CurrentPage";
import VkLinks from "./VkLinks";
export interface Reducers {
	pages: typeof PageList,
	namedPages: typeof NamedPageList,
	curPage: typeof CurrentPage,
	vkLinks: typeof VkLinks
}
const reduces: Reducer<Reducers> = combineReducers<Reducers>({
	pages: PageList,
	namedPages: NamedPageList,
	curPage: CurrentPage,
	vkLinks: VkLinks
});

export default reduces;