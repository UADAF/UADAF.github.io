import {Action} from "../../actions/Actions";
import MainPage from "../../components/Pages/MainPage";
import HelpPage from "../../components/Pages/HelpPage"
import ITHPage from "../../components/Pages/ITHPage";
import RegisterPage from "../../components/Pages/RegisterPage";
import CustomContentPage from "../../components/Pages/CustomContentPage";
import {CustomContent} from "./CustomContent";
import {ComponentClass} from "react-redux";
import QuoterPage from "../../components/Pages/QuoterPage";
export interface PageProps {
	href: string;
	glyph: string;
	windowName: string;
	clazz: ComponentClass<any>;
}

export interface PageList {
	left: PageProps[];
	right: PageProps[];
}
export default function(state: PageList, action: Action<any>, customContent: CustomContent = null): PageList {
	let pages: PageList = {
		left: [
			{
				href: "main",
				glyph: "home",
				windowName: "Главная страница",
				clazz: MainPage
			},
			{
				href: "ith",
				glyph: "bookmark",
				windowName: "ITHappens",
				clazz: ITHPage
			},
			{
				href: "quoter",
				glyph: "comment",
				windowName: "Цитатник",
				clazz: QuoterPage
			},
			{
				href: "help",
				glyph: "info-sign",
				windowName: "Помощь",
				clazz: HelpPage
			}

		],
		right: []
	};
	if(customContent.content) {
		pages.right.push({
			href: "custom",
			glyph: "pushpin",
			windowName: customContent.name,
			clazz: CustomContentPage
		});
	}
	if(window.location.href.indexOf("localhost") > -1) {
		pages.right.push({
            	href: "register",
            	glyph: "info-sign",
            	windowName: "Регистрация",
            	clazz: RegisterPage
            });
	}
	return pages;
}
