import {HelpQuestionProps} from "../components/Misc/HelpQuestion";
import {ajax} from "jquery";
export default function (state = null): HelpQuestionProps[] {
	return state || ajax({url: "json/faq.json", async: false}).responseJSON;
}