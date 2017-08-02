import {Reducer, combineReducers} from "redux";
import {Pages, default as PagesR} from "./PageGroup/Pages";
import VkLinks from "./VkLinks";
import FAQuestions from "./FAQuestions"
import {default as ITH, ITHState} from "./ITHState";
import DiscordInvite from "./DiscordInvite";
import {VkContactProps} from "../components/Vk/VkContact";
import {HelpQuestionProps} from "../components/Misc/HelpQuestion";
import {UserState, default as UserR} from "./UserState";
export interface Reducers {
	pages: Pages;
	vkLinks: Reducer<VkContactProps[]>;
	question: Reducer<HelpQuestionProps[]>;
	ithState: Reducer<ITHState>;
	discordInvite: Reducer<string>;
	user: Reducer<UserState>;
}
const reduces: Reducer<Reducers> = combineReducers<Reducers>({
	pages: PagesR,
	vkLinks: VkLinks,
	question: FAQuestions,
	ithState: ITH,
	discordInvite: DiscordInvite,
	user: UserR
});

export default reduces;