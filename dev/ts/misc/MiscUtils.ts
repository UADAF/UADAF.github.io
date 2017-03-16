import {ajax} from "jquery";

export function localStorageContains(key: string): boolean {
	let item = localStorage.getItem(key);
	return item !== null && item !== "NONE";
}

export function isJWT(jwt: string) {
	return jwt.split('.').length == 3;
}

export interface CustomContent {
	name: string;
	content: string;
	created_by: string;
}

let customContent: CustomContent;

export function getCustomContent(): CustomContent {
	if(customContent) {
		return customContent;
	}
	return customContent = ajax({
		url: "json/customContent.json",
		async: false
	}).responseJSON;
}

export function hasCustomContent(): boolean {
	return getCustomContent().content !== "NONE";
}