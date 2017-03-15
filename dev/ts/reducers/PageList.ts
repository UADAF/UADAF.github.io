import {Component} from "react";
import {Action} from "../actions/Actions";
import {hasCustomContent, getCustomContent} from "../misc/MiscUtils";
import MainPage from "../components/Pages/MainPage";
import HelpPage from "../components/Pages/HelpPage"
import ITHPage from "../components/Pages/ITHPage";
import CustomContentPage from "../components/Pages/CustomContentPage";
export interface PageProps {
	href: string;
	glyph: string;
	windowName: string;
	clazz: typeof Component;
}

export interface Pages {
	left: PageProps[];
	right: PageProps[];
}
export default function reduce(state: Pages, action: Action): Pages {
	let pages: Pages = {
		left: [
			{
				href: "main",
				glyph: "home",
				windowName: "Главная страница",
				clazz: MainPage
			},
			{
				href: "help",
				glyph: "info-sign",
				windowName: "Помощь",
				clazz: HelpPage
			},
			{
				href: "ith",
				glyph: "bookmark",
				windowName: "ITHappens",
				clazz: ITHPage
			}
		],
			right: []
	};
	if(hasCustomContent()) {
		pages.left.push({
			href: "custom",
			glyph: "info-sign",
			windowName: getCustomContent().name,
			clazz: CustomContentPage
		});
	}
	return pages;
}
