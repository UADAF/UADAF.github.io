import {Reducer, combineReducers} from "redux";
import {Pages, default as PagesR} from "./PageGroup/Pages";
import VkLinks from "./VkLinks";
import FAQuestions from "./FAQuestions"
import {ITHState, default as ITH} from "./ITHState";
import DiscordInvite from "./DiscordInvite";
import {VkContactProps} from "../components/Vk/VkContact";
import {HelpQuestionProps} from "../components/Misc/HelpQuestion";
import {UserState, default as UserR} from "./UserState";
import {QuoterState, default as Quoter} from "./QuoterState"
export interface Reducers {
	pages: Pages;
	vkLinks: Reducer<VkContactProps[]>;
	question: Reducer<HelpQuestionProps[]>;
	ithState: Reducer<ITHState>;
	discordInvite: Reducer<string>;
	user: Reducer<UserState>;
	quoter: Reducer<QuoterState>
}
const reduces: Reducer<Reducers> = combineReducers<Reducers>({
	pages: PagesR,
	vkLinks: VkLinks,
	question: FAQuestions,
	ithState: ITH,
	discordInvite: DiscordInvite,
	user: UserR,
	quoter: Quoter
});

export default reduces;