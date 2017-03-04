import {Component} from "react";
import MainPage from "../components/Pages/MainPage";
import {Action} from "../misc/MiscInterfaces";
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
export default function reduce(state, action: Action): Pages {
	return {
		left: [
			{
				href: "main",
				glyph: "home",
				windowName: "Главная страница",
				clazz: MainPage
			}
		],
		right: []
	};
}
