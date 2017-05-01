import {ajax} from "jquery";
import {store} from "../index";
import {createAction} from "../actions/Actions";
export function localStorageContains(key: string): boolean {
	let item = localStorage.getItem(key);
	return item !== null && item !== "NONE";
}

export function isJWT(jwt: string) {
	return jwt.split('.').length == 3;
}

export function loadJson(url: string, actionName: string, options: JQueryAjaxSettings = {}) {
	options.url = url;
	ajax(options).then(data => store.dispatch(createAction<any>(actionName, data)));
}
